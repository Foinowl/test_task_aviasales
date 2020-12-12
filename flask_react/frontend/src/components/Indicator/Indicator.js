import React from 'react'
import "./Indicator.scss"

const threshold = 10

const Indicator = (props) => {
  const { data } = props

  return (
		<div className="indicator">
			<div className={data.value < threshold ? "led good" : "led bad"} />
			<div className="label-wrapper">
				<p className="label">
					{data.name}:{" "}
					{data.value
						? data.value.toString().replace(".", ",") + "%"
						: data.value + "%"}
				</p>
				<p className="sublabel">
					{"Average"}:{" "}
					{data.average ? data.average.toString().replace(".", ",") + "%" : "-"}
				</p>
			</div>
		</div>
	)
}

export default Indicator