import React from 'react'
import Ticket from './Ticket'
import './style.css'

const TicketList = ({ tickets }) => (
  <div className="ticket__list">
    {tickets.map(ticket => (
      <Ticket key={ticket.uuid} {...ticket} />
    ))}
  </div>
)

export default TicketList
