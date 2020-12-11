import React, { useState, useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"
import {updateUser} from '../../redux/user/user.actions'

import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import './Email.css'


const Email = () => {
	const dispatch = useDispatch()

	const id = useSelector((state) => state.user.user.id)
	const email = useSelector((state) => state.user.user.email)

	const [value, setValue] = useState(email || "")
	const [valid, setValid] = useState(false)

	let styleLabel = ["container__form-label"]

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(updateUser(id, { email: value }))
		},
		[dispatch, id, value]
	)

	const handleChange = useCallback((e) => {
		const { value } = e.target
		const emailRegex = /\S+@\S+\.\S+/
		value.match(emailRegex) ? setValid(true) : setValid(false)
		setValue(value);
	},[setValue, setValid])

	if (!!email) {
		styleLabel.concat(".container__form--label .container__form--label")
	}

  return (
		<div className="container__email">
			{!!email && <div className="container__check--email"></div>}
			<form
				className="container__form"
				onSubmit={handleSubmit}
			>
				<p className={styleLabel.join(' ')}>Оставь почту:</p>

				<Input value={value} change={handleChange} disabled={!!email} />

				<div className="container__form-button">
					<Button disabled={!valid}>Отправить</Button>
				</div>
			</form>
		</div>
	)
}

export default Email