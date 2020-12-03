import React from 'react'
import Segment from './Segment'
import './style.css'

const Ticket = (props) => {
  const { price, carrier, segments } = props
	const urlImg = "http://pics.avs.io/110/36/"

  return (
		<div className="ticket__item">
			<div className="ticket__heading">
				<div className="ticket__price">{`${price.toLocaleString()} P`}</div>
				<div className="ticket__logo">
					<img
						src={`${urlImg}${carrier}.png`}
						srcSet={`${urlImg}${carrier}@2x.png 2x`}
						alt={carrier}
						width="110"
						height="36"
					/>
				</div>
			</div>
			<div className="ticket__segments">
				{segments.map((segment, index) => (
					<Segment key={index} {...segment} />
				))}
			</div>
		</div>
	)
}

export default Ticket
