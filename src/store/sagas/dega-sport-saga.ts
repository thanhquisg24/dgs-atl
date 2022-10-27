import { notifyMessageError } from "@emiter/AppEmitter";
import { put, takeLatest } from "redux-saga/effects";
import { initSportPage, loadDegaSportsFailAction, loadDegaSportsRequestAction } from "../actions/dega-sport-action";

function* initSportPageSaga(action: ReturnType<typeof initSportPage>): Generator | any {
  // while (true) {
  yield put(loadDegaSportsRequestAction());
  //   yield delay(10000);
  // }
}
function* fetchSportSaga(action: ReturnType<typeof loadDegaSportsRequestAction>): Generator | any {
  try {
    // const sportData: IDegaSportEntity[] = yield presenter.degaSport.fetchSports();
    // yield put(loadDegaSportsSuccesstAction(sportData));
  } catch (error) {
    yield put(loadDegaSportsFailAction("Fetch Sports fail!"));
    notifyMessageError("Fetch Sports fail!");
  }
}
function* initSportPageWatcher() {
  yield takeLatest(initSportPage.type, initSportPageSaga);
}

function* fetchSportWatcher() {
  yield takeLatest(loadDegaSportsRequestAction.type, fetchSportSaga);
}

export const degaSportWatchers = [initSportPageWatcher(), fetchSportWatcher()];
