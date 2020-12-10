import React, { useState } from "react"

import "./SocialButton.css"


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


const SocialButton = (props) => {
	const { socail, disabled, onShareWindowClose } = props


	const shareButton = (link) => {
		const linkBtn = linkButtons[link]

		window.open(linkBtn, "Птички лети, лети", "width=700,height=500")

		onShareWindowClose()
	}

	const colorBtn = colorButtons[socail]
	let styles = ["button-component button-component--share"]
	styles = styles.concat(colorBtn)
	if (disabled) {
		styles = styles.concat("button-component--active")
	}

  return (
		<button
			className={styles.join(" ")}
			disabled={disabled}
			onClick={() => shareButton(socail)}
		></button>
	)
}

export default SocialButton