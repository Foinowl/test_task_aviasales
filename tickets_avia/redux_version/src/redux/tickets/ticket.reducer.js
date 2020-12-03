import UserActionTypes from "./ticket.types"


const INITIAL_STATE = {
	sortFlight: "cheapest",
	filterStops: [0],
	isFetching: false,
	limit: 5,
	chunks: [],
	list: [],
	loading: true,
  error: null,
}

const getSegmentsDuration = (ticket) => {
  const { segments } = ticket
  return segments.reduce(
    (acc, { duration }) => acc + duration,
    0
  )
}

const flightCompare = {
  cheapest: (a, b) => a.price - b.price,
  quickest: (a, b) => getSegmentsDuration(a) - getSegmentsDuration(b)
}

const stopsFilter = (allowed) => (ticket) => {
  const { segments } = ticket
  return segments.every(({ stops }) => allowed.includes(stops.length))
}


const ticketReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action
	const { chunks, sortFlight, filterStops: stops, limit, isFetching } = state

	switch (action.type) {
		case UserActionTypes.SET_CUREENT_TICKET_LIST:
			return { ...state, chunks: chunks.concat(payload) }
		case UserActionTypes.GET_LIST:
			let list = chunks.slice()

			if (Object.prototype.hasOwnProperty.call(flightCompare, sortFlight)) {
				list.sort(flightCompare[sortFlight])
			}

			 list = list.filter(stopsFilter(stops))
			 list = list.slice(0, limit)

			return { ...state, list }
		case UserActionTypes.TICKET_SUCCESS:
			return { ...state, loading: false, isFetching: true }
		case UserActionTypes.TICKET_FAILURE:
			return { ...state, error: payload, loading: false }

		case UserActionTypes.SET_SORT_FLIGHT:
			return { ...state, sortFlight: payload }

		case UserActionTypes.SET_FILTER_STOPS:
			return { ...state, filterStops: payload }

		default: {
			return state
		}
	}
}

export default ticketReducer