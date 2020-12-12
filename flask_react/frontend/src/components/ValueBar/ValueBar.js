import React from 'react'
import "./ValueBar.scss"
 
const colors = ["#FFCC00", "#5856D5", "#2196F3", "#A0B0B9"]

const ValueBar = (props) => {
  const { values } = props

  const color = values.reduce((acc, value, index) => {
		acc[value.code] = colors[index]
		return acc
	}, {})

  console.log(values);

  return (
		<div className="value-bar">
			<div className="bar-wrapper">
				{values.length > 1 ? (
					Object.values(values).map((value) => {
						return (
							<div
								className="bar"
								style={{
									backgroundColor: color[value.code],
									width: `${value.width}`,
								}}
							/>
						)
					})
				) : (
					<div
						className="bar"
						style={{
							backgroundColor: "#a0b0b9",
							width: "100%",
						}}
					/>
				)}
			</div>
			{values.length > 1 ? (
				Object.values(values).map((value) => (
					<div className="label">
						<span
							className="square"
							style={{ backgroundColor: color[value.code] }}
						/>
						{value.code}:{" "}
						{value.count &&
							value.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
					</div>
				))
			) : (
				<div className="label">
					<span className="square" style={{ backgroundColor: "#a0b0b9" }} />
					{"No messages"}
				</div>
			)}
		</div>
	)
}

export default ValueBar