import "./Input.css"

const Input = (props) => {
  const { disabled, change, value } = props

  return (
		<input
			className="form__input"
			value={value}
			onChange={change}
			disabled={disabled}
		></input>
	)
}

export default Input;