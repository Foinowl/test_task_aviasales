import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux"
import store from "./redux/store"

import App from './pages/App/App'
// const App = () => {
// 	const dispatch = useDispatch()
// 	dispatch(startSagashDashboard())
// 	return "My first web-page"
// }



ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

reportWebVitals();
