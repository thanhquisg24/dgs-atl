import { IJwtEntity, IUserEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export interface ILoginPayload {
  username: string;
  password: string;
}
export interface ICheckAuthPayload {
  token: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRefreshTokenSuccessPayload extends IJwtEntity {}
export const doLoginSpinner = "user/LOGIN";
export const doLoginRequest = createAction<ILoginPayload>("user/LOGIN_REQUEST");
export const doLoginSuccess = createAction<IUserEntity>("user/LOGIN_SUCCESS");
export const doLoginFailure = createAction<string>("user/LOGIN_FAILURE");

export const doLogoutSpinner = "user/LOGOUT";
export const doLogoutRequest = createAction<undefined>("user/LOGOUT_REQUEST");
export const doLogoutSuccess = createAction<undefined>("user/LOGOUT_SUCCESS");
export const doLogoutFailure = createAction<string>("user/LOGOUT_FAILURE");

export const doRefreshTokenSpinner = "user/REFRESH_TOKEN";
export const doRefreshTokenRequest = createAction<string>("user/REFRESH_TOKEN_REQUEST");
export const doRefreshTokenSuccess = createAction<IRefreshTokenSuccessPayload>("user/REFRESH_TOKEN_SUCCESS");
export const doRefreshTokenFailure = createAction<string>("user/REFRESH_TOKEN_FAILURE");

export const checkAuthSpinner = "user/CHECK_AUTH";
export const checkAuthRequest = createAction<ICheckAuthPayload>("user/CHECK_AUTH_REQUEST");
export const checkAuthSuccess = createAction<undefined>("user/CHECK_AUTH_SUCCESS");
export const checkAuthFailure = createAction<string>("user/CHECK_AUTH_FAILURE");
export const fireExpiredToken = createAction<undefined>("user/TOKEN_EXPIRED");
export const fireClearToken = createAction<undefined>("user/TOKEN_CLEAR");

export type CombineAuthActionTypes =
  | ReturnType<typeof doRefreshTokenRequest>
  | ReturnType<typeof doRefreshTokenSuccess>
  | ReturnType<typeof doRefreshTokenFailure>
  | ReturnType<typeof doLogoutRequest>
  | ReturnType<typeof doLogoutSuccess>
  | ReturnType<typeof doLogoutFailure>
  | ReturnType<typeof doLoginRequest>
  | ReturnType<typeof doLoginSuccess>
  | ReturnType<typeof doLoginFailure>
  | ReturnType<typeof checkAuthRequest>
  | ReturnType<typeof checkAuthSuccess>
  | ReturnType<typeof checkAuthFailure>
  | ReturnType<typeof fireExpiredToken>
  | ReturnType<typeof fireClearToken>;
