import React from "react"

import TicketsInfo from "../TicketsInfo/TicketsInfo.component"
import "./Ticket.styles.scss"


const Ticket = () => {
  return (
		<div className="ticket box">
			<div className="price">13 400 P</div>
			<img
				className="image"
				src={`https://pics.avs.io/99/36/31.png`}
				alt="airport"
			/>

			<TicketsInfo id={1} />
			<TicketsInfo id={2} />
			<TicketsInfo id={3} />
			<TicketsInfo id={4} />
			<TicketsInfo id={4} />
			<TicketsInfo id={4} />
		</div>
	)
}

export default Ticket