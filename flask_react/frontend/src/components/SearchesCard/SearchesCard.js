import React from 'react'
import "../CardStyles/Card.scss"

const SearchesCard = (props) => {
  const {
		state: { current, diff, param1, param2, previous },
		stateColors,
	} = props
  
  const getSubTitle = () => {
    if (param1 === param2) {
      return `You get ${param1}% traffic on mobile and desktop devices.`

    }
    return `You get ${param1}% traffic on mobile and ${param2}% desktop devices.`
  }
	return (
		<div className="card">
			<div className="left-column">
				<p className="card-line">
					<span className={`label ${stateColors}`}>Searches</span>
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
					<span className="label">Mobile traffic: {param1}%</span>
				</p>
				<p className="card-line">
					<span className={"label"}>Web traffic: {param2}%</span>
				</p>
				<p className="card-line light">
					<span className="info">{getSubTitle()}</span>
				</p>
				<p className="card-line">
					<span className="help">
						Help: <button href="#">Searches</button>,{" "}
						<button href="#">Pessimisation</button>
					</span>
				</p>
			</div>
		</div>
	)
}

export default SearchesCard