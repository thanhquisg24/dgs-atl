import { IUserEntity } from "@adapters/entity";
import {
  doLoginFailure,
  doLoginRequest,
  doLoginSuccess,
  doLogoutRequest,
  doLogoutSuccess,
  doLogoutFailure,
  doRefreshTokenRequest,
  doRefreshTokenFailure,
} from "@store/actions/auth-action";
import { delay, put, takeLatest } from "redux-saga/effects";

const sampleUser: IUserEntity = {
  username: "alex",
  userId: 1,
  token: "233245aaaaa",
  type: "barr",
  refreshToken: "sssss",
  tokenExpiration: 3000,
  _rcode: "SUCCESS",
};
function* loginSaga(action: ReturnType<typeof doLoginRequest>): Generator | any {
  try {
    yield delay(5000);
    yield put(doLoginSuccess(sampleUser));
    yield delay(2000);
    yield put(doRefreshTokenRequest(sampleUser.refreshToken));
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
    yield delay(60000); //interval refresh
    const rstokenResponse = {
      accessToken: "aaaaa",
      refreshToken: "bbbbb",
      tokenType: "ccccc",
    };
    yield put(doRefreshTokenRequest(rstokenResponse.refreshToken));
  } catch (error) {
    yield put(doRefreshTokenFailure("Refresh token fail!"));
    // notifyMessageError("Fetch Sports fail!");
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
