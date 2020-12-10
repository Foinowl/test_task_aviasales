import UserActionTypes from "./user.types"


const INITIAL_STATE = {
  user: localStorage.getItem('user'),
	loading: false,
	error: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
	const { type, paylod } = action
	console.log("Payloads in reducer", paylod)
	// const { id, share, email } = payload

  switch (type) {
		case UserActionTypes.CREATE_USER_SUCCESS:
		case UserActionTypes.UPDATE_USER_SUCCESS:
		case UserActionTypes.GET_USER_SUCCESS: {
			return { user: { ...paylod }, loading: false, error: null }
		}

		case UserActionTypes.CREATE_USER_START:
		case UserActionTypes.UPDATE_USER_START:
		case UserActionTypes.GET_USER_START: {
			return { ...state, loading: true, error: null }
		}

		case UserActionTypes.CREATE_USER_FAIL:
		case UserActionTypes.UPDATE_USER_FAIL:
		case UserActionTypes.GET_USER_FAIL: {
			return { ...state, loading: false, error: paylod }
		}

		default:
			return state
	}
}

export default userReducer