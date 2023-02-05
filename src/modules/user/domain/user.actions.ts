import type { User } from "@/types/user"
import type { UserOutput } from "@/modules/user/domain/user.output"
import { UserCallTypes } from "@/modules/user/domain/user.call-types"
import { userSlice } from "@/modules/user/domain/user.slice"
// import { UserDTO } from "@/modules/user/domain/user.dto"
// import { UserRO } from "@/modules/user/domain/user.ro"
const { actions } = userSlice

export const getUser =
	() =>
	async (dispatch, _, { userOutput }: { userOutput: UserOutput }) => {
		const callType = UserCallTypes.fetchMyUser
		dispatch(actions.startCall({ callType }))
		try {
			const loggedInUser: User = await userOutput.fetchMyUser()

			dispatch(actions.myCurrentUser(loggedInUser))
		} catch (error) {
			dispatch(actions.logoutSucceeded())
			dispatch(
				actions.catchError({
					error: error?.response?.data?.message || error?.message,
					callType,
				})
			)
		}
	}

export const logout = () => (dispatch) => {
	dispatch(actions.logoutSucceeded())
}
