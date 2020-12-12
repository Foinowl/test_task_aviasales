import React from "react"
import "../CardStyles/Card.scss"

const ClicksCard = (props) => {
  const {
		state: { current, diff, param1, param2, previous },
		stateColors,
	} = props
  return (
		<div className="card">
			<div className="left-column">
				<p className="card-line">
					<span className={`label ${stateColors}`}>Clicks</span>
					<div className={`led ${stateColors}`}>{diff + "%"}</div>
				</p>
				<p className="card-line">
					<span className="number">
						{current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
					</span>
					<span className="text">Yesterday</span>
				</p>
				<p className="card-line light">
					<span className="number">
						{previous.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
					</span>
					<span className="text">Last friday</span>
				</p>
			</div>
			<div className="right-column">
				<p className="card-line">
					<span className={`label ${stateColors}`}>CTR: {param1}%</span>
				</p>
				<p className="card-line light">
					<span className="info">
						Conversion from searches to clicks on all devices.
					</span>
				</p>
				<p className="card-line">
					<span className="help">
						Help: <button href="#">CTR</button>,{" "}
						<button href="#">Clicks</button>
					</span>
				</p>
			</div>
		</div>
	)
	
}

export default ClicksCard
