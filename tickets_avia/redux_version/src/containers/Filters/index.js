import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import Filter from "../../components/Filter"
import { setStops } from "../../redux/tickets/ticket.actions"
import {
	filterStops,
} from "../../redux/tickets/ticket.selectors"
import "./style.css"

const options = [
	{ label: "Без пересадок", value: 0 },
	{ label: "1 пересадка", value: 1 },
	{ label: "2 пересадка", value: 2 },
	{ label: "3 пересадка", value: 3 },
]

const Filters = ({ stops, setFilterStops }) => {
	return (
		<div className="filters__wrapper">
			<Filter
				options={options}
				initialValue={stops}
				onChange={(payload) => setFilterStops(payload)}
			/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	stops: filterStops,
})

const mapDispatchToProps = (dispatch) => ({
	setFilterStops: (payload) => dispatch(setStops(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
