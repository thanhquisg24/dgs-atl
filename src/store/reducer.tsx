import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
});
export default rootReducer;
