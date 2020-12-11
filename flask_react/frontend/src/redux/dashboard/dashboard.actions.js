import dashboardTypes from "./dashboard.types"


export const startSagashDashboard = () => ({
	type: dashboardTypes.FETCH_START,
})

export const startFetchDashboard = () => ({
	type: dashboardTypes.FETCH_DASHBOARD,
})

export const succesFetchDashboard = (payload) => ({
	type: dashboardTypes.SET_DASHBOARD,
	payload,
})

export const failureFetchDashboard = (error) => ({
	type: dashboardTypes.FETCH_DASHBOARD_FAILURE,
	payload: error
})