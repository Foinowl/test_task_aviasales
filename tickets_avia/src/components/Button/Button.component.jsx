import React from 'react'
// import classes from "./Button.styles.scss"
import "./Button.styles.scss"

const Button = ({ id, text, active, clickHandler }) => {
  return (
		<button
			onClick={() => clickHandler(id)}
			type="button"
			className={`${"btn"} ${active ? "active" : ""}`}
		>
			{text}
		</button>
	)
}

export default Button