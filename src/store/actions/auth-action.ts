import { IUserEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export interface ILoginPayload {
  username: string;
  password: string;
}
export interface ICheckAuthPayload {
  token: string;
}
export const dologinSpinner = "user/LOGIN";
export const doLoginRequest = createAction<ILoginPayload>("user/LOGIN_REQUEST");
export const doLoginSuccess = createAction<IUserEntity>("user/LOGIN_SUCCESS");
export const doLoginFailure = createAction<string>("user/LOGIN_FAILURE");

export const checkAuthSpinner = "user/CHECK_AUTH";
export const checkAuthRequest = createAction<ICheckAuthPayload>("user/CHECK_AUTH_REQUEST");
export const checkAuthSuccess = createAction<undefined>("user/CHECK_AUTH_SUCCESS");
export const checkAuthFailure = createAction<string>("user/CHECK_AUTH_FAILURE");

export type CombineAuthActionTypes =
  | ReturnType<typeof doLoginRequest>
  | ReturnType<typeof doLoginSuccess>
  | ReturnType<typeof doLoginFailure>
  | ReturnType<typeof checkAuthRequest>
  | ReturnType<typeof checkAuthSuccess>
  | ReturnType<typeof checkAuthFailure>;
