import React, { useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"

import { updateUser } from "../redux/user/user.actions"

import "./Social.css"
import SocialButton from '../components/SocialButton/SocialButton'

const Social = () => {
	const dispatch = useDispatch()

	
	const id = useSelector((state) => state.user.user.id)
	const shared = useSelector((state) => state.user.user.shared)

	const handleShare = useCallback(() => {
		dispatch(updateUser(id, { shared: true }))
	}, [dispatch, id])

	let styles = ["container__social-label"]

	if (shared) {
		styles = styles.concat("container__social--label")
	}
	return (
		<div className="container__social">
			{shared && <div className="container__check"></div>}
			<div className="wrapper">
				<p className={styles.join(" ")}>Поделись с друзьями:</p>
				<div className="container__buttons">
					<SocialButton
						socail="vk"
						disabled={shared}
						onShareWindowClose={handleShare}
						anime={true}
					/>
					<SocialButton
						socail="facebook"
						disabled={shared}
						onShareWindowClose={handleShare}
						anime={true}
					/>
					<SocialButton
						socail="twitter"
						disabled={shared}
						onShareWindowClose={handleShare}
						anime={true}
					/>
					<SocialButton
						socail="ok"
						disabled={shared}
						onShareWindowClose={handleShare}
						anime={true}
					/>
				</div>
			</div>
		</div>
	)
}

export default Social;