import './App.css';
import Wrapper from './components/Wrapper/Wrapper'
import Actions from './pages/Actions/Actions'
import { Provider } from "react-redux"
import store from "./redux/store"


function App() {
	return (
		<Provider store={store}>
			<Wrapper>
				<Actions />
			</Wrapper>
		</Provider>
	)
}

export default App;
