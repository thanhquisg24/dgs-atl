import { all, put, takeLatest } from "redux-saga/effects";
import { notifyMessageError } from "@emiter/AppEmitter";
import {
  fetchLeagueInfoTreeFailure,
  fetchLeagueInfoTreeRequest,
  fetchLeagueInfoTreeSuccess,
} from "@store/actions/feed-action";
import { diRepositorires } from "@adapters/di";

function* fetchDgsLeaguesSaga(): Generator | any {
  try {
    const [listDgs, listDonbest, lineTypes, sportBooks] = yield all([
      diRepositorires.dgsLeague.fetAvaiableDgsLeague(),
      diRepositorires.donbestLeague.fetAvaiableDonbestLeague(),
      diRepositorires.dgsLeague.fetchAvaiableDgsLineType(),
      diRepositorires.donbestLeague.fetAvaiableDonbestSportBook(),
    ]);

    yield put(
      fetchLeagueInfoTreeSuccess({
        listDgsLeague: listDgs,
        listDonbestLeague: listDonbest,
        listDgsLineType: lineTypes,
        listDonbestSportBook: sportBooks,
      }),
    );
  } catch (error) {
    console.log("🚀 ~ file: feed-saga.ts ~ line 18 ~ function*fetchDgsLeaguesSaga ~ error", error);
    yield put(fetchLeagueInfoTreeFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchDgsLeaguesWatcher() {
  yield takeLatest(fetchLeagueInfoTreeRequest.type, fetchDgsLeaguesSaga);
}

export const feedWatchers = [fetchDgsLeaguesWatcher()];
