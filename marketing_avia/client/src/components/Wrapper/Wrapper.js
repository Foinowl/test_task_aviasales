import "./Wrapper.css"
import logo from "../../assets/icons/logo.svg"
import Clouds from "../Clouds/Clouds"


const Wrapper = (props) => {
	const {children} = props
  return (
		<div className="container">
			<div className="logo">
				{/* <img src={logo} alt="Logo" /> */}
			</div>
      <Clouds />
      
      {children}
		</div>
	)
}

export default Wrapper;