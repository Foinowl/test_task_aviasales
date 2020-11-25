import React from 'react'
import Filter from '../../components/Filter/Filter.component'
import SortButtons from "../../components/SortButtons/SortButtons.component"
import TicketsColumn from "../../components/TicketsColumn/TickectsColumn.component"	

import {getSearchID, getTicketsPart} from '../../API/api'

import './Main.styles.scss'

class MainPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tickets: [],
			cloneTickets: null,
			selectButton: "low price",
		}
	}

	getDataApi = () => {
	
		getSearchID().then((res) => {
			const id = res.data.searchId
			getTicketsPart(id)
				.then((res) => {
					const ticket = res.data.tickets
					this.setState({ tickets: ticket.slice(0, 10) })
					this.setState({ cloneTickets: ticket.slice(0, 10) })
				})
		})
	}

	componentDidMount() {
		if (!this.state.tickets.length) {
			this.getDataApi()
		}
	}

	hideTickets = isCheck => {
		const {tickets} = this.state
		isCheck ? this.setState({cloneTickets: tickets}) : this.setState({cloneTickets: []})
	}

	sortNonStop = isCheck => {
		const {tickets, cloneTickets} = this.state
		if (isCheck) {
			const arraySort = tickets.filter((item) => {
				return item.segments.every((i) => i.stops.length === 0) // all route without transfers
			})
			this.setState({ cloneTickets: [...cloneTickets, ...arraySort] })
		} else {
			const arraySort = cloneTickets.filter((item) => {
				return item.segments.some((i) => i.stops.length > 0) // one or more of the route with a transfers
			})
			this.setState({ cloneTickets: [...cloneTickets, ...arraySort] })
		}
	}


	sortByStops = (num, isCheck) => {
		const {tickets, cloneTickets} = this.state
		if (isCheck) {
			const arraySort = tickets.filter(item => {
				const sort1 = item.segments.some((i) => i.stops.length === num)
				const sort2 = item.segments.every((i) => i.stops.length <= num)
				return sort1 && sort2
			})
			this.setState({ cloneTickets: [...cloneTickets, ...arraySort] })
		} else {
			const arraySort = cloneTickets.filter((item) => {
				const sort1 = item.segments.some((i) => i.stops.length > num)
				const sort2 = item.segments.every((i) => i.stops.length < num)
				return sort1 || sort2
			})
			this.setState({ cloneTickets: arraySort })
		}
	}

	sortButtons = id => {
		this.setState({ selectButton: id })
	}

	render() {
		return (
			<main className="main-container">
				<Filter
					hideTickets={this.hideTickets}
					sortNonStop={this.sortNonStop}
					sortByStops={this.sortByStops}
				/>
				<div>
					<SortButtons sorts={this.sortButtons} />
					<TicketsColumn lists={this.state.cloneTickets} />
				</div>
			</main>
		)
	}
}

export default MainPage