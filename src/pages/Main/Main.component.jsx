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

	sortButtons = id => {
		this.setState({ selectButton: id })
	}

	render() {
		return (
			<main className="main-container">
				<Filter />
				<div>
					<SortButtons sorts={this.sortButtons}/>
					<TicketsColumn lists={this.state.tickets} />
				</div>
			</main>
		)
	}
}

export default MainPage