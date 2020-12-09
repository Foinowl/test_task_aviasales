import './Email.css'
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"


const Email = () => {
  return (
		<div className="container__email">
			<form className="container__form">
				<p className="container__form-label">Оставь почту:</p>

				<Input />

				<div className="container__form-button">
					<Button>Отправить</Button>
				</div>
			</form>
		</div>
	)
}

export default Email