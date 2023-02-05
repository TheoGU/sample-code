import { ReduxAction } from "@/types/redux-action"
import { UserState } from "@/modules/user/domain/user.state"
import { UserCallTypes } from "@/modules/user/domain/user.call-types"

const requesting = "requesting_"
export const userReducers = {
	catchError: (state: UserState, action: ReduxAction): void => {
		state.lastError = action.payload.error
		state[`${requesting}${action.payload.callType}`] = false
	},
	startCall: (state: UserState, action: ReduxAction): void => {
		state.lastError = null
		state[`${requesting}${action.payload.callType}`] = true
	},
	myCurrentUser: (state: UserState, action: ReduxAction): void => {
		state[`${requesting}${UserCallTypes.fetchMyUser}`] = false
		state.user = action.payload
	},
	logoutSucceeded: (state: UserState): void => {
		state.user = null
	},
}
