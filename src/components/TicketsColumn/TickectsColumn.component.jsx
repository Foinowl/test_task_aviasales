import React from 'react'

import Ticket from "../Ticket/Ticket.component"
import './TicketsColumn.styles.scss'


const TicketsColumn = ({lists }) => {


	const genTicket = () => {
		return lists.map((val, ind) => <Ticket key={ind} />)
	}


	return <div className="tickets">{lists ? genTicket() : null}</div>
}


export default TicketsColumn