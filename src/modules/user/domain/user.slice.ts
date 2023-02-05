import { createSlice } from "@reduxjs/toolkit"
import { initialUserState } from "@/modules/user/domain/user.state"
import { userReducers } from "@/modules/user/domain/user.reducers"

export const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: userReducers,
})
