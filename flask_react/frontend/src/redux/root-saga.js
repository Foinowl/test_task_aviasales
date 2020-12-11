import { call } from "redux-saga/effects"

import { dashboardSagas } from "./dashboard/dashboard.sagas"

export default function* rootSaga() {
	yield call(dashboardSagas)
}
