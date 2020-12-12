import React from 'react'
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg"
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"
import { ReactComponent as ClickIcon } from "../../assets/icons/click.svg"

import "./Icon.scss"

const Icon = (props) => {
  const { type, state } = props
  return (
		<div className="icon">
			<div className="circle" />
			<div className={`state ${state}`} />
			{type === "clicks" && <ClickIcon className="svg" width="15px" />}
			{type === "searches" && <FilterIcon className="svg" width="16px" />}
			{type === "bookings" && <CartIcon className="svg" width="20px" />}

			<i role="button" className="Icon">
				<div className="Icon_size Icon_statArrow" />
			</i>
		</div>
	)
}

export default Icon