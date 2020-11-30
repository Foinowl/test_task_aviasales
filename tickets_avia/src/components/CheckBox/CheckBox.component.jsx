import React from 'react'
import './CheckBox.styles.scss'

const CheckBox = (props) => {
  const { id, text, checked, clickHandler } = props
  return (
		<li>
			<label className="label">
				<input
					type="checkbox"
					className="input"
					id={id}
					name={text}
					value={text}
					checked={checked}
					onChange={() => clickHandler(id, !checked)}
				/>
				<span className="checkbox" />
				{text}
			</label>
		</li>
	)
}

export default CheckBox