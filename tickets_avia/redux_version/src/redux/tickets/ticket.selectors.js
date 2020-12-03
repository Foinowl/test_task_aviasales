import { createSelector } from "reselect"

const selectTicket = (state) => state.tickets

export const selectList = createSelector(
	[selectTicket],
	(tickets) => tickets.list
)

export const selectLoading = createSelector(
	[selectTicket],
	(tickets) => tickets.loading
)

export const selectChunk = createSelector(
	[selectTicket],
	(tickets) => tickets.chunk
)

export const getFet = createSelector([selectTicket], (tickets) => tickets.isFetching)

export const sortFlight = createSelector(
	[selectTicket],
	(tickets) => tickets.sortFlight
)


export const filterStops = createSelector(
	[selectTicket],
	(tickets) => tickets.filterStops
)
