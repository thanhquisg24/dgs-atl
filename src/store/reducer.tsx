import { combineReducers } from "redux";

// reducer import
import themesReducer from "./reducers/customizationReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: themesReducer,
});
export default rootReducer;
