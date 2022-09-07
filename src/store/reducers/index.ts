import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { initialAuthState } from "./auth-reducer";
import themesReducer, { initialStateThemes } from "./customizationReducer";
import sportReducer, { initialStateSport } from "./dega-sport-reducer";
import feedReducer, { initialFeedState } from "./feed-reducer";
import spinnerReducer, { initialSpinnerState } from "./spinner-reducer";

const rootReducer = combineReducers({
  spinner: spinnerReducer,
  sport: sportReducer,
  themes: themesReducer,
  auth: authReducer,
  feed: feedReducer,
});

export default rootReducer;
export const initialState: ReturnType<typeof rootReducer> = {
  spinner: initialSpinnerState,
  sport: initialStateSport,
  themes: initialStateThemes,
  auth: initialAuthState,
  feed: initialFeedState,
};
