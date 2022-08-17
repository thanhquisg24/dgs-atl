import { IUserEntity } from "@adapters/entity";
import { doLoginFailure, doLoginRequest, doLoginSuccess } from "@store/actions/auth-action";
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
  } catch (error) {
    // console.log("🚀 ~ file: dega-sport-saga.ts ~ line 24 ~ function*fetchSportSaga ~ error", error);
    yield put(doLoginFailure("Login fail!"));
    // notifyMessageError("Fetch Sports fail!");
  }
}
function* loginSagaWatcher() {
  yield takeLatest(doLoginRequest.type, loginSaga);
}

export const authWatchers = [loginSagaWatcher()];
