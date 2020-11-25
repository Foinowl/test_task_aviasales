import React from "react"

import TicketsInfo from "../TicketsInfo/TicketsInfo.component"
import "./Ticket.styles.scss"


const Ticket = ({ ticket }) => {
	const urlImg = "http://pics.avs.io/99/36/"

	const { price, carrier, segments } = ticket

	const generateUnId = () => {
		return Math.random().toString(36).substr(2, 9)
	}

	const formatTimeNumbers = (number) => {
		return number < 10 ? `0${number}` : `${number}`
	}

	const getTime = (date, time) => {
		const fromTimestamp = Date.parse(date)
		const fromDate = new Date(date)
		const toTimeStamp = fromTimestamp + time * 60 * 1000
		const toDate = new Date(toTimeStamp)
		const fromHours = formatTimeNumbers(fromDate.getHours())
		const toHours = formatTimeNumbers(toDate.getHours())
		const toMinutes = formatTimeNumbers(toDate.getMinutes())
		const fromMinutes = formatTimeNumbers(fromDate.getMinutes())
		const fromString = `${fromHours}:${fromMinutes}`
		const toString = `${toHours}:${toMinutes}`
		return `${fromString} - ${toString}`
	}



	const getTravelTime = (time) => {
		const minutes = time % 60
		const hours = (time - minutes) / 60
		return `${hours}ч ${minutes}м`
	}

  return (
		<div className="ticket box">
			<div className="price">{`${price.toLocaleString()} P`}</div>
			<img
				className="image"
				src={`${urlImg}${carrier}.png`}
				alt={ticket.carrier}
			/>

			{segments.map((item, i) => (
				<>
					<TicketsInfo
						key={generateUnId()}
						title={`${item.origin} - ${item.destination}`}
						text={getTime(item.date, item.duration)}
					/>
					<TicketsInfo
						key={generateUnId()}
						title="В пути"
						text={getTravelTime(item.duration)}
					/>
					<TicketsInfo
						key={generateUnId()}
						title={
							item.stops.length > 0
								? `${item.stops.length} пересадк${
										item.stops.length === 1 ? "a" : "и"
								  }`
								: "Без пересадок"
						}
						text={item.stops.join(", ")}
					/>
				</>
			))}
		</div>
	)
}

export default Ticket