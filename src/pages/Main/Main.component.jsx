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
			sortTickets: null,
			selectButton: "low price",
		}
	}

	getDataApi = () => {
	
		getSearchID().then((res) => {
			const id = res.data.searchId
			getTicketsPart(id)
				.then((res) => {
					const ticket = res.data.tickets
					this.setState({ tickets: ticket.slice(0, 5) })
					this.setState({ cloneTickets: ticket.slice(0, 5) })
					this.sortByButton()
				})
		})
	}

	componentDidMount() {
		if (!this.state.tickets.length) {
			this.getDataApi()
		}
	}

	sortByButton = () => {
		
		const { selectButton, cloneTickets } = this.state
		if(!cloneTickets) return
		if (selectButton === "low price") {
			const sortArray = cloneTickets.sort((a, b) =>
				a.price > b.price ? 1 : -1
			)
			this.setState({ sortTickets: sortArray })
		}

		if (selectButton === "fastest") {
			const sortArray = [...cloneTickets].sort((a, b) => {
				const firstTicket = a.segments.reduce((acc, i) => i.duration + acc, 0)
				const secondTicket = b.segments.reduce((acc, i) => i.duration + acc, 0)

				if (firstTicket > secondTicket) {
					return 1
				} else if (firstTicket < secondTicket) {
					return -1
				} else {
					return 0
				}
			})
			this.setState({ sortTickets: sortArray })
		}
	}

	hideTickets = isCheck => {
		const { tickets } = this.state
		isCheck ? this.setState({ cloneTickets: tickets }) : this.setState({ cloneTickets: [] })
		setTimeout(() => {
			this.sortByButton()
		}, 800)
	}

	sortNonStop = isCheck => {
		const {tickets, cloneTickets} = this.state
		if (isCheck) {
			const arraySort = tickets.filter((item) => {
				return item.segments.every((i) => i.stops.length === 0) // all route without transfers
			})
			this.setState({ cloneTickets: [...cloneTickets, ...arraySort] })
			setTimeout(() => {
				this.sortByButton()
			}, 800)
		} else {
			const arraySort = cloneTickets.filter((item) => {
				return item.segments.some((i) => i.stops.length > 0) // one or more of the route with a transfers
			})
			this.setState({ cloneTickets: [...cloneTickets, ...arraySort] })
			setTimeout(() => {
				this.sortByButton()
			}, 800)
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
			setTimeout(() => {
				this.sortByButton()
			}, 800)
		} else {
			const arraySort = cloneTickets.filter((item) => {
				const sort1 = item.segments.some((i) => i.stops.length > num)
				const sort2 = item.segments.every((i) => i.stops.length < num)
				return sort1 || sort2
			})
			this.setState({ cloneTickets: arraySort })
			setTimeout(() => {
				this.sortByButton()
			}, 800)
		}
	}

	sortButtons = id => {
		this.setState({ selectButton: id })
		setTimeout(() => {
			this.sortByButton()
		}, 800)
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
					<TicketsColumn lists={this.state.sortTickets} />
				</div>
			</main>
		)
	}
}

export default MainPage