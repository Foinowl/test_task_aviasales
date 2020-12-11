import React from 'react'

import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import SocialButton from '../../components/SocialButton/SocialButton'
import "./Final.css"


const Final = () => {
  const user = useSelector((state) => state.user.user)

  if (!user.id || !user.shared || !user.email) return <Redirect to="/actions" />

	return (
		<div className="final__page">
			<h1 className="final__title">
				<span className="final__span">Выборы</span>
				<br />
				путешествие
				<br />
				<span className="final__span--big">близко!</span>
			</h1>

			<div className="final_btn">
				<SocialButton socail="vk" anime={false} />
				<SocialButton socail="facebook" anime={false} />
				<SocialButton socail="twitter" anime={false} />
				<SocialButton socail="ok" anime={false} />
			</div>
		</div>
	)
}

export default Final