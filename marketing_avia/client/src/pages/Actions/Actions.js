import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../redux/user/user.actions"

import './Actions.css'
import Social from '../../containers/Social'
import Email from "../../containers/Email/Email"

const Actions = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	useEffect(() => {
		const savedUser = localStorage.getItem("user")

		if (!savedUser) dispatch(createUser())
	}, [dispatch])

	if (!user) return null
	console.log(user);

  return (
		<div className="content__form">
			<h1 className="page__title">Чтобы выиграть путешествие</h1>

			<Social></Social>
			<Email></Email>
		</div>
	)
}

export default Actions