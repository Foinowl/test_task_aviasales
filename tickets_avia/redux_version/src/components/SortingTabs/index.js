import React, { useState } from 'react'
import './style.css'


const SortingTabs = (props) => {
  const { options, initialValue, onChange } = props
  const [selected, select] = useState(initialValue)

  const onTabSelect = (value) => {
    select(value)
    onChange(value)
  }

  return (
		<div className="sorting__tabs">
			{options.map((option) => (
				<div
					className={`sorting__tab ${
						selected.includes(option.value) ? "active" : ""
					}`}
					onClick={onTabSelect.bind(null, option.value)}
					tabIndex="0"
				>
					{option.label}
				</div>
			))}
		</div>
	)
}

export default SortingTabs
