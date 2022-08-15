import { createReducer } from "@reduxjs/toolkit";
import { loadDegaSportsFailAction, loadDegaSportsSuccesstAction } from "../actions/dega-sport-action";

import { IDegaSportModel } from "../models/dega-sport-model";

export const initialStateSport: IDegaSportModel = {
  data: {},
  isInitLoaded: false,
};
const sportReducer = createReducer(initialStateSport as IDegaSportModel, (builder) => {
  builder.addCase(loadDegaSportsSuccesstAction, (state, action) => {
    const newState = { ...state };
    const reduceObj = action.payload.reduce((obj, cur) => ({ ...obj, [cur.did]: cur }), {});
    newState.data = reduceObj;
    newState.isInitLoaded = true;
    return newState;
  });
  builder.addCase(loadDegaSportsFailAction, (state, action) => {
    return { ...state, isInitLoaded: true };
  });
});

export default sportReducer;
