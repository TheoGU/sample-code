import { combineReducers } from "redux";
import { userSlice } from "@/modules/user/domain/user.slice";

export const appReducer = combineReducers({
  user: userSlice.reducer,
});

// TODO: fix with correct type
//@ts-ignore
export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
