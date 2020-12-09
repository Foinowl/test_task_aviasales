import './Actions.css'
import Social from '../../containers/Social'
import Email from "../../containers/Email/Email"

const Actions = () => {
  return (
		<div className="content__form">
			<h1 className="page__title">Чтобы выиграть путешествие</h1>

			<Social></Social>
			<Email></Email>
		</div>
	)
}

export default Actions