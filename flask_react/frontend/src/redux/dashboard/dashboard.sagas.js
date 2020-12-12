import { takeLatest, call, put, all } from "redux-saga/effects"
import getData from "../../api/dashboard"

import {
	startFetchDashboard,
	succesFetchDashboard,
	failureFetchDashboard,
} from "./dashboard.actions"

import dashboardTypes from "./dashboard.types"

export function* fetchCollectionsAsync() {
  try {
    yield put(startFetchDashboard());
    const data = yield call(() => { 
      return getData()
		});
		console.log("Fetch type data in sagas", data.data)
		yield put(succesFetchDashboard(data.data))
	} catch (error) {
		yield put(failureFetchDashboard(error.message))
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		dashboardTypes.FETCH_START,
		fetchCollectionsAsync
	)
}

export function* dashboardSagas() {
	yield all([call(fetchCollectionsStart)])
}
