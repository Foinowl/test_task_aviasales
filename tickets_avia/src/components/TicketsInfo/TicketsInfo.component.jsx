import React from 'react'

import './TicketsInfo.styles.scss'

const TicketsInfo = ({title, text}) => {
  return (
		<div className="container-info">
			<div className="title-info">{title}</div>
			<div className="text-info">{text}</div>
		</div>
	)

}

export default TicketsInfo