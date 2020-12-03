import React, { useEffect } from "react"
import "./App.css"
import store from "./redux/store"
import { fetchCollectionsTicketList } from "./redux/tickets/ticket.actions"

import Header from "./containers/Header"
import Filters from "./containers/Filters"
import Tickets from "./containers/Tickets"

const App = () => {

  // useEffect(() => {
	// 	store.dispatch(fetchCollectionsTicketList())
	// }, [])

  return (
		<div className="app">
			<>
				<Header />
				<div className="container">
					<Filters />
					<Tickets />
				</div>
			</>
		</div>
	)
}

export default App;
