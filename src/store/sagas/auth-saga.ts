import { IUserEntity } from "@adapters/entity";
import { presenter } from "@adapters/presenters";
import {
  doLoginFailure,
  doLoginRequest,
  doLoginSuccess,
  doLogoutRequest,
  doLogoutSuccess,
  doLogoutFailure,
  doRefreshTokenRequest,
  doRefreshTokenFailure,
  doRefreshTokenSuccess,
} from "@store/actions/auth-action";
import { delay, put, takeLatest } from "redux-saga/effects";

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
    yield delay(5000);
    const resData: IUserEntity = yield presenter.auth.postLogin(action.payload.username, action.payload.password);
    yield put(doLoginSuccess(resData));
    yield delay(2000);
    yield put(doRefreshTokenRequest(resData.refreshToken));
  } catch (error) {
    // console.log("🚀 ~ file: dega-sport-saga.ts ~ line 24 ~ function*fetchSportSaga ~ error", error);
    yield put(doLoginFailure("Login fail!"));
    // notifyMessageError("Fetch Sports fail!");
  }
}

function* logoutSaga(): Generator | any {
  try {
    yield delay(5000);
    yield put(doLogoutSuccess());
  } catch (error) {
    // console.log("🚀 ~ file: dega-sport-saga.ts ~ line 24 ~ function*fetchSportSaga ~ error", error);
    yield put(doLogoutFailure("Logout fail!"));
    // notifyMessageError("Fetch Sports fail!");
  }
}

function* refreshTokenSaga(action: ReturnType<typeof doRefreshTokenRequest>): Generator | any {
  // yield call(api);
  try {
    yield delay(1000 * 60 * 60 * 5); //interval refresh 5 hour
    const refreshData = yield presenter.auth.postRefreshToken(action.payload);
    yield put(doRefreshTokenSuccess(refreshData));
    yield put(doRefreshTokenRequest(refreshData.refreshToken));
  } catch (error) {
    yield put(doRefreshTokenFailure("Refresh token fail!"));
  }
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

export const authWatchers = [loginSagaWatcher(), logoutSagaWatcher(), refreshTokenSagaWatcher()];
