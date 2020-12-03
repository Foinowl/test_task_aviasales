import React, { useEffect } from 'react'
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"

import store from '../../redux/store'
import {
	fetchCollectionsTicketList,
	ticketGetList,
	setSortFlight,
} from "../../redux/tickets/ticket.actions"
import './style.css'
import SortingTabs from '../../components/SortingTabs'
import TicketList from '../../components/TicketList'
import {
	selectList,
	sortFlight,
	filterStops,
	selectChunk,
	getFet,
	selectLoading,
} from "../../redux/tickets/ticket.selectors"

const sortingOptions = [
  { label: 'самый дешевый', value: 'cheapest' },
  { label: 'самый быстрый', value: 'quickest' },
]

const Tickets = ({
	list,
	tickets,
	sortFlight,
	stops,
	getList,
	isFetching,
	setSortFlight,
}) => {
	useEffect(() => {
		if (!isFetching) {
			store.dispatch(fetchCollectionsTicketList())
		}
	}, [])

	useEffect(() => {
		store.dispatch(getList())
	}, [list, sortFlight, stops, isFetching])

	console.log(tickets)
	return (
		<div className="main">
			<SortingTabs
				options={sortingOptions}
				initialValue={sortFlight}
				onChange={(payload) => setSortFlight(payload)}
			/>
			<TicketList tickets={tickets} />
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	list: selectChunk,
	tickets: selectList,
	sortFlight: sortFlight,
	stops: filterStops,
	isFetching: getFet,
})

const mapDispatchToProps = (dispatch) => ({
	getList: () => dispatch(ticketGetList()),
	setSortFlight: (payload) => dispatch(setSortFlight(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
