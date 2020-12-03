import React from 'react'
import './style.css'

const Segment = (props) => {
  const { origin, destination, date, duration, stops } = props

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
		<div className="ticket__segment">
			<div className="ticket__segment__meta">
				<div className="ticket__segment__meta__heading">
					{origin} - {destination}`
				</div>
				<div className="ticket__segment__meta__body">
					{getTime(date, duration)}
				</div>
			</div>
			<div className="ticket__segment__meta">
				<div className="ticket__segment__meta__heading">В пути</div>
				<div className="ticket__segment__meta__body">
					{getTravelTime(duration)}
				</div>
			</div>
			<div className="ticket__segment__meta">
				<div className="ticket__segment__meta__heading">
					{stops.length > 0
						? `${stops.length} пересадк${stops.length === 1 ? "a" : "и"}`
						: "Без пересадок"}
				</div>
				<div className="ticket__segment__meta__body">{stops.length}</div>
			</div>
		</div>
	)
}

export default Segment
