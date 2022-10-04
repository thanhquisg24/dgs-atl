import { put, takeLatest } from "redux-saga/effects";
import { notifyMessageError } from "@emiter/AppEmitter";
import { fetchDgsLeaguesFailure, fetchDgsLeaguesRequest, fetchDgsLeaguesSuccess } from "@store/actions/feed-action";
import { IDgsLeagueEntity } from "@adapters/entity/DgsLeagueEntity";
import { diRepositorires } from "@adapters/di";

function* fetchDgsLeaguesSaga(): Generator | any {
  try {
    const data: IDgsLeagueEntity[] = yield diRepositorires.dgsLeague.fetAvaiableDgsLeague();
    console.log("🚀 ~ file: feed-saga.ts ~ line 10 ~ function*fetchDgsLeaguesSaga ~ data", data);
    yield put(fetchDgsLeaguesSuccess(data));
  } catch (error) {
    yield put(fetchDgsLeaguesFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchDgsLeaguesWatcher() {
  yield takeLatest(fetchDgsLeaguesRequest.type, fetchDgsLeaguesSaga);
}

export const feedWatchers = [fetchDgsLeaguesWatcher()];
