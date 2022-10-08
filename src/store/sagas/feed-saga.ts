import { all, put, select, takeLatest } from "redux-saga/effects";
import { notifyMessageError } from "@emiter/AppEmitter";
import {
  fetchLeagueInfoTreeFailure,
  fetchLeagueInfoTreeRequest,
  fetchLeagueInfoTreeSuccess,
  selectLeagueIdFailure,
  selectLeagueIdNotChanged,
  selectLeagueIdRequest,
  selectLeagueIdSuccess,
} from "@store/actions/feed-action";
import { diRepositorires } from "@adapters/di";
import { FilterTypeEnum } from "@adapters/entity";
import { getSelectedLeagueId } from "@store/selector";

function* fetchDgsLeaguesSaga(): Generator | any {
  try {
    const [listDgs, listDonbest, lineTypes, sportBooks, defaultCombine] = yield all([
      diRepositorires.dgsLeague.fetAvaiableDgsLeague(),
      diRepositorires.donbestLeague.fetAvaiableDonbestLeague(),
      diRepositorires.dgsLeague.fetchAvaiableDgsLineType(),
      diRepositorires.donbestLeague.fetAvaiableDonbestSportBook(),
      diRepositorires.donbestFilter.fetDefaultFilterCombine(),
    ]);

    yield put(
      fetchLeagueInfoTreeSuccess({
        listDgsLeague: listDgs,
        listDonbestLeague: listDonbest,
        listDgsLineType: lineTypes,
        listDonbestSportBook: sportBooks,
        defaultFilterCombine: defaultCombine,
      }),
    );
  } catch (error) {
    yield put(fetchLeagueInfoTreeFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchDgsLeaguesWatcher() {
  yield takeLatest(fetchLeagueInfoTreeRequest.type, fetchDgsLeaguesSaga);
}
function* fetchSelectedDgsLeaguesSaga(action: ReturnType<typeof selectLeagueIdRequest>): Generator | any {
  try {
    const prevSelect = yield select(getSelectedLeagueId);
    if (prevSelect !== action.payload) {
      const lueagueCombineConfig = yield diRepositorires.donbestFilter.fetFilterCombine(
        FilterTypeEnum.LEAGUE,
        action.payload,
        0,
      );

      yield put(
        selectLeagueIdSuccess({
          id: action.payload,
          filterCombine: lueagueCombineConfig,
        }),
      );
    } else {
      yield put(selectLeagueIdNotChanged());
    }
  } catch (error) {
    console.log("🚀 ~ file: feed-saga.ts ~ line 57 ~ function*fetchSelectedDgsLeaguesSaga ~ error", error);
    yield put(selectLeagueIdFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchSelectedDgsLeaguesSagaWatcher() {
  yield takeLatest(selectLeagueIdRequest.type, fetchSelectedDgsLeaguesSaga);
}

export const feedWatchers = [fetchDgsLeaguesWatcher(), fetchSelectedDgsLeaguesSagaWatcher()];
