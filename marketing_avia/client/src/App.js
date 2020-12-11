import './App.css';
import Wrapper from './components/Wrapper/Wrapper'
import Actions from './pages/Actions/Actions'
import Final from "./pages/Final/Final"

import { Provider } from "react-redux"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom"

import store from "./redux/store"


function App() {
	return (
		<Provider store={store}>
			<Router>
				<Wrapper>
					<Switch>
						<Route path="/final" exact component={Final} />
						<Route path="/actions" exact component={Actions} />

						<Redirect from="/" to="/actions" />
					</Switch>
				</Wrapper>
			</Router>
		</Provider>
	)
}

export default App;
