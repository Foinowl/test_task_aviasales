import "./Social.css"
import SocialButton from '../components/SocialButton/SocialButton'

const Social = () => {
	

  return (
		<div className="container__social">
			<div className="wrapper">
				<p className="container__social-label">Поделись с друзьями:</p>
				<div className="container__buttons">
					<SocialButton socail="vk"></SocialButton>
					<SocialButton socail="facebook"></SocialButton>
					<SocialButton socail="twitter"></SocialButton>
					<SocialButton socail="ok"></SocialButton>
				</div>
			</div>
		</div>
	)
}

export default Social;