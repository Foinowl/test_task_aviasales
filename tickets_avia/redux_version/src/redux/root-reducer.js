import { combineReducers } from "redux"

import ticketReducer from "./tickets/ticket.reducer"

const rootReducer = combineReducers({
	tickets: ticketReducer,
})

export default rootReducer
