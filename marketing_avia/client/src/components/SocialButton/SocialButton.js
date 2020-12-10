import React, { useState } from "react"

import "./SocialButton.css"

import heart from "../../assets/icons/heart.svg"
import _vk from "../../assets/icons/vk.svg"
import _facebook from "../../assets/icons/facebook.svg"
import _twitter from "../../assets/icons/twitter.svg"
import _ok from "../../assets/icons/ok.svg"

const typeButtons = {
	facebook: _facebook,
	ok: _ok,
	twitter: _twitter,
	vk: _vk,
}


const colorButtons = {
	facebook: "btn--facebook",
	ok: "btn--ok",
	twitter: "btn--twitter",
	vk: "btn--vk",
}

const linkButtons = {
	facebook:
		"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Faviasales.ru%2F&amp;src=sdkpreparse",
	ok: "https://connect.ok.ru/offer?url=https%3A%2F%2aviasales.ru",
	twitter:
		"https://twitter.com/intent/tweet?text=Смотри%20что%20я%20нашел%20на%20Aviasales.ru&url=https%3A%2F%2Faviasales.ru%2F",
	vk: "https://vk.com/share.php?url=https%3A%2F%2Faviasales.ru%2FShare",
}


const shareButton = (link) => {
	const linkBtn = linkButtons[link]

	let shareWindow = window.open(
		linkBtn,
		"Птички лети, лети",
		"width=700,height=500"
	)
}

const SocialButton = (props) => {
	const { socail } = props
	const srcBtn = typeButtons[socail]
	const colorBtn = colorButtons[socail]
	let styles = ["button-component button-component--share"]
	styles = styles.concat(colorBtn)


  return (
		<button
			className={styles.join(" ")}
			onClick={() => shareButton(socail)}
		>
		</button>
	)
}

export default SocialButton