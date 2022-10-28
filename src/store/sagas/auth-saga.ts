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
  doRefreshTokenRequest,
  doRefreshTokenSuccess,
} from "@store/actions/auth-action";
import { IAuthModel } from "@store/models/auth-model";
import { getAuthSelector } from "@store/selector";
import { delay, put, select, takeLatest } from "redux-saga/effects";

// const sampleUser: IUserEntity = {
//   username: "alex",
//   userId: 1,
//   token: "233245aaaaa",
//   type: "barr",
//   refreshToken: "sssss",
//   tokenExpiration: 3000,
//   _rcode: "SUCCESS",
// };
function* loginSaga(action: ReturnType<typeof doLoginRequest>): Generator | any {
  try {
    // yield delay(1000);
    const resData: IUserEntity = yield presenter.auth.postLogin(action.payload.username, action.payload.password);
    yield put(doLoginSuccess(resData));
    // yield delay(1000 * 60 * 5); //interval refresh 25 minute
    yield put(doRefreshTokenRequest(resData.refreshToken));
  } catch (error) {
    yield put(doLoginFailure("Login fail!"));
    notifyMessageError("Login fail!");
  }
}

function* logoutSaga(): Generator | any {
  try {
    const auth: IAuthModel = yield select(getAuthSelector);
    const username = auth.currentUser ? auth.currentUser.username : "";
    yield presenter.auth.postLogout(username);
    yield put(doLogoutSuccess());
  } catch (error) {
    yield put(doLogoutFailure("Logout fail!"));
    notifyMessageError("Logout fail!");
  }
}

function* refreshTokenSaga(action: ReturnType<typeof doRefreshTokenRequest>): Generator | any {
  // yield call(api);
  try {
    yield delay(1000 * 60 * 5); //interval refresh 15 minute
    const refreshData = yield presenter.auth.postRefreshToken(action.payload);
    yield put(doRefreshTokenSuccess(refreshData));
    yield put(doRefreshTokenRequest(refreshData.refreshToken));
  } catch (error) {
    yield put(doRefreshTokenFailure("Refresh token fail!"));
    notifyMessageError("Refresh token fail!");
  }
}

function* initAuthTokenSaga(): Generator | any {
  try {
    const user: IUserEntity = yield presenter.auth.checkInitLocalStorageLogin();
    yield put(doLoginSuccess(user));
  } catch (error) {
    yield put(doLoginFailure(error.message));
    notifyMessageError(error.message);
  }
}

function* initAuthTokenWatcher() {
  yield takeLatest(appInitAction.type, initAuthTokenSaga);
}

function* refreshTokenSagaWatcher() {
  yield takeLatest(doRefreshTokenRequest.type, refreshTokenSaga);
}

function* loginSagaWatcher() {
  yield takeLatest(doLoginRequest.type, loginSaga);
}

function* logoutSagaWatcher() {
  yield takeLatest(doLogoutRequest.type, logoutSaga);
}

export const authWatchers = [loginSagaWatcher(), logoutSagaWatcher(), refreshTokenSagaWatcher(), initAuthTokenWatcher()];
