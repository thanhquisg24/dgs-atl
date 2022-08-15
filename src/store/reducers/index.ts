import { combineReducers } from "@reduxjs/toolkit";
import themesReducer, { initialStateThemes } from "./customizationReducer";
import sportReducer, { initialStateSport } from "./dega-sport-reducer";
import spinnerReducer, { initialSpinnerState } from "./spinner-reducer";

const rootReducer = combineReducers({
  spinner: spinnerReducer,
  sport: sportReducer,
  themes: themesReducer,
});

export default rootReducer;
export const initialState: ReturnType<typeof rootReducer> = {
  spinner: initialSpinnerState,
  sport: initialStateSport,
  themes: initialStateThemes,
};
