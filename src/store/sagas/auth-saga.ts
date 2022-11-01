import { IUserEntity } from "@adapters/entity";
import { presenter } from "@adapters/presenters";
import { notifyMessageError } from "@emiter/AppEmitter";
import { appInitAction } from "@store/actions";
import {
  doLoginFailure,
  doLoginRequest,
  doLoginSuccess,
  doLogoutFailure,
  doLogoutRequest,
  doLogoutSuccess,
  doRefreshTokenFailure,
  doRefreshTokenSuccess,
  fireClearToken,
  fireExpiredToken,
} from "@store/actions/auth-action";
import { IAuthModel } from "@store/models/auth-model";
import { getAuthSelector } from "@store/selector";
import { delay, put, race, select, spawn, take, takeEvery, takeLatest } from "redux-saga/effects";

interface ITokenObject {
  expiresIn: number;
  createdAt: number;
  [otherProps: string]: any;
}

function isTokenExpired(token: ITokenObject): boolean {
  const currentTimestamp = Date.now();
  const { createdAt, expiresIn } = token;
  return currentTimestamp >= createdAt + expiresIn;
}

export function* timer(ms: number) {
  const { timeout } = yield race({
    timeout: delay(ms),
    cancel: take("user/TOKEN_CLEAR"),
  });

  if (timeout) {
    yield put(fireExpiredToken());
  }
}

function* loginSaga(action: ReturnType<typeof doLoginRequest>): Generator | any {
  try {
    // yield delay(1000);
    const resData: IUserEntity = yield presenter.auth.postLogin(action.payload.username, action.payload.password);
    yield put(doLoginSuccess(resData));
    yield spawn(timer, resData.expiresIn);
    // yield delay(1000 * 60 * 5); //interval refresh 25 minute
    // yield put(doRefreshTokenRequest(resData.refreshToken));
  } catch (error) {
    yield put(doLoginFailure("Login fail!"));
    notifyMessageError("Login fail!");
  }
}

function* logoutSaga(): Generator | any {
  try {
    const auth: IAuthModel = yield select(getAuthSelector);
    const username = auth.currentUser || "";
    yield presenter.auth.postLogout(username);
    yield put(doLogoutSuccess());
    yield put(fireClearToken());
  } catch (error) {
    yield put(doLogoutFailure("Logout fail!"));
    notifyMessageError("Logout fail!");
  }
}

function* refreshTokenSaga(): Generator | any {
  // yield call(api);
  try {
    // yield delay(1000 * 60 * 5); //interval refresh 15 minute
    const tokenObject: IAuthModel = yield select(getAuthSelector);
    console.log("🚀 ~ file: auth-saga.ts ~ line 76 ~ function*refreshTokenSaga ~ tokenObject", tokenObject);
    if (tokenObject.jwt) {
      const refreshTokenData = yield presenter.auth.postRefreshToken(tokenObject.jwt.refreshToken);
      yield put(doRefreshTokenSuccess(refreshTokenData));
      yield spawn(timer, refreshTokenData.expiresIn);
    } else {
      notifyMessageError("Not found Refresh Token !");
    }
    // yield put(doRefreshTokenRequest(refreshData.refreshToken));
  } catch (error) {
    yield put(doRefreshTokenFailure("Refresh token fail!"));
    notifyMessageError("Refresh token fail!");
  }
}

function* initAuthTokenSaga(): Generator | any {
  try {
    const user: IUserEntity = yield presenter.auth.checkInitLocalStorageLogin();
    const isExpired = isTokenExpired(user);
    if (isExpired) {
      notifyMessageError("Your Session has been expired!");
    } else {
      yield put(doLoginSuccess(user));
      yield spawn(timer, user.expiresIn);
    }
  } catch (error) {
    yield put(doLoginFailure(error.message));
    notifyMessageError(error.message);
  }
}

function* initAuthTokenWatcher() {
  yield takeLatest(appInitAction.type, initAuthTokenSaga);
}

function* refreshTokenSagaWatcher() {
  yield takeEvery(fireExpiredToken.type, refreshTokenSaga);
}

function* loginSagaWatcher() {
  yield takeLatest(doLoginRequest.type, loginSaga);
}

function* logoutSagaWatcher() {
  yield takeLatest(doLogoutRequest.type, logoutSaga);
}

export const authWatchers = [loginSagaWatcher(), logoutSagaWatcher(), refreshTokenSagaWatcher(), initAuthTokenWatcher()];
