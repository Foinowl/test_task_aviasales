import dashboardTypes from "./dashboard.types"


const INITIAL_STATE = {
	data: null,
	isFetching: false,
	errorMessage: undefined,
	param: 'today'
}


const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
		case dashboardTypes.FETCH_DASHBOARD:
			return {
				...state,
				isFetching: true,
			}
		case dashboardTypes.SET_DASHBOARD:
			return {
				...state,
				isFetching: false,
				data: action.payload,
			}
		case dashboardTypes.FETCH_DASHBOARD_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			}
		case dashboardTypes.PUSH_URL: {
			return {
				...state,
				param: action.payload
			}
		}
		default:
			return state
	}
}

export default dashboardReducer