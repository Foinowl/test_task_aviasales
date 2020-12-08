# -*- coding: utf-8 -*-
import datetime

from lxml import etree


class Parser:


    DATA = {
        False: 'avia/data/RS_ViaOW.xml',
        True: 'avia/data/RS_Via-3.xml',
        }

    def __init__(self, source=None, dest=None, back=False, adult=1, child=1, infant=1):
        fpath = Parser.DATA[back]
        self.back = back
        self.xml = self._get_xml(fpath)
        self.source = source.upper() if source else None
        self.dest = dest.upper() if dest else None
        self.adult, self.child, self.infant = adult, child, infant

    def _get_xml(self, fpath):
        with open(fpath, 'rb') as f:
            data = etree.fromstring(f.read())
        return data

    def parse_time(self, time_string):
        return datetime.datetime.strptime(time_string, '%Y-%m-%dT%H%M')

    def parse_stop(self, stop):
        '''
        Переделываем точку маршрута в удобный JSON
        '''
        return {
            'Carrier': stop.find('Carrier').text,
            'FlightNumber': stop.find('FlightNumber').text,
            'Source': stop.find('Source').text,
            'Destination': stop.find('Destination').text,
            'DepartureTimeStamp': self.parse_time(stop.find('DepartureTimeStamp').text),
            'ArrivalTimeStamp': self.parse_time(stop.find('ArrivalTimeStamp').text),
            'Class': stop.find('Class').text,
            'FareBasis': stop.find('FareBasis').text.strip(),
            'TicketType': stop.find('TicketType').text,
        }

    def get_price(self, flight):
        '''
        Считаем цену для всех пассажиров
        '''
        def _get_price(dtype, amount, default='SingleAdult'):
            try:
                if amount:
                    return float(flight.xpath('Pricing/ServiceCharges[@type="%s" and @ChargeType="TotalAmount"]' % dtype)[0].text) * amount
                else:
                    return 0
            except IndexError:
                return float(flight.xpath('Pricing/ServiceCharges[@type="%s" and @ChargeType="TotalAmount"]' % default)[0].text) * amount
        return sum([
            _get_price('SingleAdult', self.adult),
            _get_price('SingleChild', self.child),
            _get_price('SingleInfant', self.infant),
        ])

    def get_flights(self):
        '''
        Все варианты
        '''
        data = list()

        flights = self.xml.xpath('PricedItineraries/Flights[OnwardPricedItinerary[Flights[Flight[1][Source[text()="{0}"]] and Flight[last()][Destination[text()="{1}"]]]]]'.format(self.source, self.dest))
        for flight in flights:
            onward = [self.parse_stop(stop) for stop in flight.xpath('OnwardPricedItinerary/Flights/Flight')]
            back = [self.parse_stop(stop) for stop in flight.xpath('ReturnPricedItinerary/Flights/Flight')] if self.back else list()
            source = onward[0]['Source']
            dest = onward[-1]['Destination']
            time_to = onward[-1]['ArrivalTimeStamp'] - onward[0]['DepartureTimeStamp']
            time_from = (back[-1]['ArrivalTimeStamp'] - back[0]['DepartureTimeStamp']) if back else datetime.timedelta(0)
            data.append({
                'onward': onward,
                'back': back,
                'price': self.get_price(flight),
                'currency': flight.find('Pricing').get('currency'),
                'source': source,
                'dest': dest,
                'time_to': time_to.total_seconds(),
                'time_from': time_from.total_seconds(),
                'time_total': time_to.total_seconds() + time_from.total_seconds(),
            })
        return data

    def get_best(self):
        '''
        Самый дорогой/дешёвый, быстрый/долгий и оптимальный варианты
        '''
        flights = self.get_flights()
        if not flights:
            return dict()
        sotred_by_price = sorted(flights, key = lambda item: item['price'])
        sotred_by_time = sorted(flights, key = lambda item: item['time_total'])
        data = {
            'expensive': sotred_by_price[-1],
            'cheap': sotred_by_price[0],
            'fast': sotred_by_time[0],
            'slow': sotred_by_time[-1],
            'best': sorted(flights, key = lambda item: item['time_total']/sotred_by_time[0]['time_total'] * item['price'])[0],   
        }
        return data
