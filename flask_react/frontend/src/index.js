import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { useDispatch, useSelector } from "react-redux"
import { connect } from "react-redux"
import { Provider } from "react-redux"
import store from "./redux/store"
import { startSagashDashboard } from "./redux/dashboard/dashboard.actions"

const App = () => {
	const dispatch = useDispatch()
	dispatch(startSagashDashboard())
	return "My first web-page"
}


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

reportWebVitals();
