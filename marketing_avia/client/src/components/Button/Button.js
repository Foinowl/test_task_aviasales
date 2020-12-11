import "./Button.css"

const Button = (props) => {
  const { disabled, children } = props
  return (
		<button className="btn" disabled={disabled}>
			{children}
		</button>
	)
}

export default Button