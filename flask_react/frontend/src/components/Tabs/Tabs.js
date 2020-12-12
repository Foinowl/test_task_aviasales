import React from 'react'

import { periodFromData } from "../../constants"
import "./Tabs.scss"

const Tabs = (props) => {
  const { tabs, id, onNavigate, keyPage } = props
	console.log("props from tabs", tabs, id, keyPage)
	
	return (
		<button
			isactive={String(id === keyPage)}
			id={id}
			className="tab-button"
			onClick={onNavigate}
		>
			{periodFromData[tabs]}
		</button>
	)
}

export default Tabs