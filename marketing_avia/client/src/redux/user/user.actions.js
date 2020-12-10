import UserActionTypes from "./user.types"
import { getUserApi, updateUserApi, createUserApi } from "../../API/usersAPI"

const createUserStart = () => ({
	type: UserActionTypes.CREATE_USER_START,
})

const updateUserStart = () => ({
	type: UserActionTypes.UPDATE_USER_START,
})

const getUserStart = () => ({
	type: UserActionTypes.GET_USER_START,
})


const createUserFail = (error) => ({
	type: UserActionTypes.CREATE_USER_FAIL,
	payload: error,
})

const updateUserFail = (error) => ({
	type: UserActionTypes.UPDATE_USER_FAIL,
	payload: error,
})

const getUserFail = (error) => ({
	type: UserActionTypes.GET_USER_FAIL,
	payload: error,
})


const createUserSuccess = (paylod) => ({
	type: UserActionTypes.CREATE_USER_SUCCESS,
	paylod,
})

const updateUserSuccess = (paylod) => ({
	type: UserActionTypes.UPDATE_USER_SUCCESS,
	paylod,
})

const getUserSuccess = (paylod) => ({
	type: UserActionTypes.GET_USER_SUCCESS,
	paylod,
})


export const createUser = () => {
	return async (dispatch) => {
		dispatch(createUserStart())

		try {
			const { data } = await createUserApi()
			localStorage.setItem("user", JSON.stringify(data))
			 dispatch(createUserSuccess(data))
		} catch (error) {
			dispatch(createUserFail(error))
		}

	}
}

export const updateUser = (id, props) => {
	return async(dispatch) => {
		dispatch(updateUserStart())

		try {
			const { data } = await updateUserApi(id, props)
			localStorage.setItem('user', JSON.stringify(data))
			dispatch(updateUserSuccess(data))
		} catch (error) {
				dispatch(updateUserFail(error))
		}
	}
}

export const getUser = (id) => {
	return async (dispatch) => {
		dispatch(getUserStart())

		try {
			const { data } = await getUserApi(id)
			localStorage.setItem('user', JSON.stringify(data))
			dispatch(getUserSuccess(data))
		} catch (error) {
			dispatch(getUserFail(error))
		}
	}
}