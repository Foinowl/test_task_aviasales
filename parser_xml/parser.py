import xml.etree.ElementTree as et


ID_FIELDS = ("Carrier", "FlightNumber", "Source", "Destination", )
DATA_FIELDS = ("Class", "TicketType", )
DATA_TIME_FIELDS = ("DepartureTimeStamp", "ArrivalTimeStamp", )
ALL_FIELDS = ID_FIELDS + DATA_FIELDS + DATA_TIME_FIELDS


class ValidateValue:
    def __init__(self, fid, data, prices, **kwargs):
        self.flights = []
        for idval, dataval in zip(fid, data):
            self.flights.append(
                {
                    k: v for k, v in zip(
                        ALL_FIELDS,
                        idval + dataval
                    )
                }
            )
        self.prices = prices

class ParserFiles:
  
  def __init__(self, filename):
    self.flights = {}

    self.tree = et.parse(filename)

    self.return_present = False

  def _flight_id(self, flight):
    fid = tuple(
        flight.find(field).text
        for field in ID_FIELDS
    )
    return fid

  def _flight_data(self, flight):
    return tuple(
        flight.find(field).text
        for field in DATA_FIELDS
    ) + tuple(
        flight.find(field).text.split("T")[1]
        for field in DATA_TIME_FIELDS
    )

  def _get_flights(self, element, selector):
    flight_ids = []
    flight_datas = []
    for el in element.findall(selector):
        flight_ids.append(self._flight_id(el))
        flight_datas.append(self._flight_data(el))
    return (tuple(flight_ids), tuple(flight_datas))

  def _pricing(self, service_charges):
      return tuple(
          (service_charges.attrib["type"], service_charges.text)
      )

  def parse_file(self):
    for flights_el in self.tree.findall("./PricedItineraries/Flights"):
        ids_onward, data_onward = self._get_flights(
            flights_el, "./OnwardPricedItinerary/Flights/Flight"
        )
        ids_return, data_return = self._get_flights(
            flights_el, "./ReturnPricedItinerary/Flights/Flight"
        )
        prices = (
            flights_el.find("Pricing").attrib["currency"],
            tuple(self._pricing(p) for p in flights_el.findall(
                "./Pricing/ServiceCharges[@ChargeType='TotalAmount']"
            ))
        )

        if ids_return:
            self.flights[(ids_onward, ids_return)] = {
                "prices": prices,
                "data": (data_onward, data_return),
            }
            self.return_present = True
        else:
            self.flights[ids_onward] = {
                "prices": prices,
                "data": data_onward,
            }

    return (self.return_present, self.flights)


class FlightsAdded(ValidateValue):
  def __str__(self):
    return "Flights added: {}".format(self.flights)


class FlightsRemoved(ValidateValue):
  def __str__(self):
    return "Flights removed: {}".format(self.flights)


class PriceChanged(ValidateValue):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.old_prices = kwargs.get("old_prices", None)

  def __str__(self):
      return f"Price changed for flights: {self.flights} was: {self.old_prices} now: {self.prices}"


class DataChanged(ValidateValue):
    def __init__(self, fid, old_data, *args, **kwargs):
        super().__init__(fid, *args, **kwargs)
        self.old_flights = []
        for idval, dataval in zip(fid, old_data):
            self.old_flights.append(
                {
                    k: v for k, v in zip(
                        ALL_FIELDS,
                        idval + dataval
                    )
                }
            )

    def __str__(self):
        return f"Data changed for flights: {self.flights} was: {self.old_flights}"


def check_diff_val(base_data, data):
   flights_added = [
       FlightsAdded(fid, **flight)
       for fid, flight in data.items()
       if fid not in base_data
   ]
   flights_removed = [
       FlightsRemoved(fid, **flight)
       for fid, flight in base_data.items()
       if fid not in data
   ]
   prices_changed = [
       PriceChanged(fid, old_prices=base_data[fid]["prices"], **flight)
       for fid, flight in data.items()
       if fid in base_data and
       flight["prices"] != base_data[fid]["prices"]
   ]
   data_changed = [
       DataChanged(fid, old_data=base_data[fid]["data"], **flight)
       for fid, flight in data.items()
       if fid in base_data and
       flight["data"] != base_data[fid]["data"]
   ]

   return (flights_added, flights_removed, prices_changed, data_changed)


def parse_file(filename):
  pars_file = ParserFiles(filename)
  return pars_file.parse_file()


def main(one_file, two_file):
  all_files = [one_file, two_file]
  files_data = [parse_file(filename) for filename in all_files]

  base_return_present, base_data = files_data[0]
  return_present, data = files_data[1]

  if base_return_present and not return_present:
      base_without_return = {
          k[0]: {
              "prices": v["prices"],
              "data": v["data"][0],
          } for k, v in base_data.items()
      }
      return check_diff_val(
          base_without_return, data
      )
  elif return_present and not base_return_present:
      data_without_return = {
          k[0]: {
              "prices": v["prices"],
              "data": v["data"][0],
          } for k, v in data.items()
      }
      return check_diff_val(
          base_data, data_without_return
      )
  else:
      return check_diff_val(base_data, data)

if __name__ == '__main__':
  values = main('RS_ViaOW.xml', 'RS_Via-3.xml')
  for vv in values:
    for c in vv:
      print(c, end='\n')
