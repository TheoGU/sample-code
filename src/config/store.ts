import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { rootReducer } from "./root-reducer"
import { outputs } from "@/config/outputs"

const middleware = [
	...getDefaultMiddleware({
		immutableCheck: false,
		thunk: { extraArgument: outputs },
	}),
]

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});


