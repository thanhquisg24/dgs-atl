import { createReducer } from "@reduxjs/toolkit";
import { IAuthModel } from "@store/models/auth-model";
import {
  doLoginFailure,
  // doLoginRequest,
  doLoginSuccess,
  checkAuthSuccess,
  // checkAuthRequest,
  checkAuthFailure,
} from "../actions/auth-action";

const initialAuthState: IAuthModel = {
  authChecked: false,
  loggedIn: false,
  currentUser: null,
};

const authReducer = createReducer(initialAuthState as IAuthModel, (builder) => {
  builder.addCase(doLoginSuccess, (state, action) => {
    const newState = { ...state };
    newState.loggedIn = true;
    newState.authChecked = true;
    newState.currentUser = action.payload;
    return newState;
  });
  builder.addCase(doLoginFailure, (state, action) => {
    return { ...state, loggedIn: false, authChecked: false, currentUser: null };
  });
  builder.addCase(checkAuthSuccess, (state, action) => {
    return { ...state, loggedIn: true, authChecked: true };
  });
  builder.addCase(checkAuthFailure, (state, action) => {
    return { ...state, loggedIn: false, authChecked: false };
  });
});

export default authReducer;
