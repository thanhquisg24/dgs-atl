import { CombineActionTypes } from "../actions";
import rootReducer from "../reducers";

export type RootStateType = ReturnType<typeof rootReducer>;
export type AllActionType = CombineActionTypes;
