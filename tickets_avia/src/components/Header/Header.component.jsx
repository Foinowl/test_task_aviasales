import React from "react"
import logo from "../../assets/images/logo.svg"
import "./Header.styles.scss"


const Header = () => {
  return (
		<div className="header">
			<img className="logo" src={logo} alt="AviasalesLogo" />
		</div>
	)
}

export default Header