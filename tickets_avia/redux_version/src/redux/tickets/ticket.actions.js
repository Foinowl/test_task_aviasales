import UserActionTypes from "./ticket.types"
import api from '../../API/api'

export const ticketList = (ticketId) => ({
	type: UserActionTypes.SET_CUREENT_TICKET_LIST,
	payload: ticketId,
})


export const ticketGetList = () => ({
	type: UserActionTypes.GET_LIST,
})


export const setStops = (payload) => ({
	type: UserActionTypes.SET_FILTER_STOPS,
	payload,
})

export const setSortFlight = (payload) => ({
	type: UserActionTypes.SET_SORT_FLIGHT,
	payload,
})


export const ticketListStart = () => ({
	type: UserActionTypes.TICKET_START,
})

export const ticketListSuccess = () => ({
	type: UserActionTypes.TICKET_SUCCESS,
})

export const ticketListFailure = (error) => ({
	type: UserActionTypes.TICKET_FAILURE,
	payload: error,
})


export const fetchCollectionsTicketList = () => {
	return (dispatch) => {
		api
			.getSearchId()
			.then((response) => {
				dispatch(ticketListStart())
				const id = response.data.searchId
				if (id) {
					api
						.getChunkBySearchId(response.data.searchId)
						.then((response) => {
							console.log(response.data.tickets)
							dispatch(ticketList(response.data.tickets))
							dispatch(ticketListSuccess())
						})
						.catch((err) => ticketListFailure(err))

				} else {
					fetchCollectionsTicketList()
				}
			})
			.catch((err) => ticketListFailure(err))
	}
}
