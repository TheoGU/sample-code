// import { fakeUser } from "@/modules/user/user.fake"
import {
	BaseState,
	initialBaseState,
} from "@/modules/shared/redux/state.helpers"
import type { User } from "@/types/user"

export interface UserState extends BaseState {
	user: User
	requestingFetchMyUser: boolean
}

export const initialUserState: UserState = {
	...initialBaseState,
	user: null,
	requestingFetchMyUser: false,
}
