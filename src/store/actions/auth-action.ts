import { IUserEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export interface ILoginPayload {
  username: string;
  password: string;
}
export interface ICheckAuthPayload {
  token: string;
}

export const doLoginRequest = createAction<ILoginPayload>("user/LOGIN_REQUEST");
export const doLoginSuccess = createAction<IUserEntity>("user/LOGIN_SUCCESS");
export const doLoginFailure = createAction<string>("sport/LOGIN_FAILURE");

export const checkAuthRequest = createAction<ICheckAuthPayload>("user/CHECK_AUTH_REQUEST");
export const checkAuthSuccess = createAction<undefined>("user/CHECK_AUTH_SUCCESS");
export const checkAuthFailure = createAction<string>("sport/CHECK_AUTH_FAILURE");

export type CombineDegaSportActionTypes =
  | ReturnType<typeof doLoginRequest>
  | ReturnType<typeof doLoginSuccess>
  | ReturnType<typeof doLoginFailure>
  | ReturnType<typeof checkAuthRequest>
  | ReturnType<typeof checkAuthSuccess>
  | ReturnType<typeof checkAuthFailure>;
