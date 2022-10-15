import { all, put, select, takeLatest } from "redux-saga/effects";
import { notifyMessageError } from "@emiter/AppEmitter";
import {
  expandLeagueFailure,
  expandLeagueRequest,
  expandLeagueSuccess,
  fetchLeagueInfoTreeFailure,
  fetchLeagueInfoTreeRequest,
  fetchLeagueInfoTreeSuccess,
  selectEventFilterdReFresh,
  selectEventFilterdRequest,
  selectEventFilterFailure,
  selectEventFilterSuccess,
  selectLeagueIdFailure,
  selectLeagueIdNotChanged,
  selectLeagueIdRefresh,
  selectLeagueIdRequest,
  selectLeagueIdSuccess,
} from "@store/actions/feed-action";
import { diRepositorires } from "@adapters/di";
import { FilterTypeEnum } from "@adapters/entity";
import { getLeagueLeftInfoTree, getSelectedLeagueId } from "@store/selector";
import { ILeagueInfoModel } from "@store/models/feed-model";

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
        action.payload.dgsLeagueId,
        0,
      );

      yield put(
        selectLeagueIdSuccess({
          id: action.payload.dgsLeagueId,
          dgsSportId: action.payload.dgsSportId,
          filterCombine: lueagueCombineConfig,
          defaultSelectedLineType: null,
        }),
      );
    } else {
      yield put(selectLeagueIdNotChanged());
    }
  } catch (error) {
    console.log("🚀 ~ file: feed-saga.ts ~ line 75 ~ function*fetchSelectedDgsLeaguesSaga ~ error", error);
    yield put(selectLeagueIdFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchSelectedDgsLeaguesSagaWatcher() {
  yield takeLatest(selectLeagueIdRequest.type, fetchSelectedDgsLeaguesSaga);
}

function* fetchSelectedDgsLeaguesRefreshSaga(action: ReturnType<typeof selectLeagueIdRefresh>): Generator | any {
  try {
    const lueagueCombineConfig = yield diRepositorires.donbestFilter.fetFilterCombine(
      FilterTypeEnum.LEAGUE,
      action.payload.dgsLeagueId,
      0,
    );
    yield put(
      selectLeagueIdSuccess({
        id: action.payload.dgsLeagueId,
        dgsSportId: action.payload.dgsSportId,
        filterCombine: lueagueCombineConfig,
        defaultSelectedLineType: action.payload.defaultSelectedLineType,
      }),
    );
  } catch (error) {
    yield put(selectLeagueIdFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}
function* fetchSelectedDgsLeaguesRefreshSagaWatcher() {
  yield takeLatest(selectLeagueIdRefresh.type, fetchSelectedDgsLeaguesRefreshSaga);
}

function* fetchExpandLeagueSaga(action: ReturnType<typeof expandLeagueRequest>): Generator | any {
  try {
    const DgsGames = yield diRepositorires.dgsGame.fetAvaiableDgsGames(action.payload);
    const infoTree: { [dgsLeagueId: number]: ILeagueInfoModel } = yield select(getLeagueLeftInfoTree);
    const dbLeagueId = infoTree[action.payload].donbestLeague.idLeague;
    yield put(expandLeagueSuccess({ dbLeagueId, dgsLeagueId: Number(action.payload), list: DgsGames }));
  } catch (error) {
    yield put(expandLeagueFailure("Expand League fail!"));
    notifyMessageError("Expand League fail!");
  }
}
function* fetchExpandLeagueSagaWatcher() {
  yield takeLatest(expandLeagueRequest.type, fetchExpandLeagueSaga);
}

function* fetchFilterEventSaga(action: ReturnType<typeof selectEventFilterdRequest>): Generator | any {
  try {
    const { dgsLeagueId, idGame } = action.payload;
    const eventPeriodFilters = yield diRepositorires.donbestFilter.fetEventFilter(dgsLeagueId, idGame);
    const data = {
      eventFilterPeriodConfig: eventPeriodFilters,
      gameWithLeague: action.payload,
      defaultSelectedLineType: eventPeriodFilters.length > 0 ? eventPeriodFilters[0].lineTypeId : null,
    };
    yield put(selectEventFilterSuccess(data));
  } catch (error) {
    yield put(selectEventFilterFailure("Fetch Event FIlter fail!"));
    notifyMessageError("Fetch Event FIlter fail!");
  }
}
function* fetchFilterEventSagaWatcher() {
  yield takeLatest(selectEventFilterdRequest.type, fetchFilterEventSaga);
}

function* fetchFilterEventRefreshSaga(action: ReturnType<typeof selectEventFilterdReFresh>): Generator | any {
  try {
    const { dgsLeagueId, idGame } = action.payload.gameWithLeague;
    const eventPeriodFilters = yield diRepositorires.donbestFilter.fetEventFilter(dgsLeagueId, idGame);
    const data = {
      eventFilterPeriodConfig: eventPeriodFilters,
      gameWithLeague: action.payload.gameWithLeague,
      defaultSelectedLineType: action.payload.defaultSelectedLineType,
    };
    yield put(selectEventFilterSuccess(data));
  } catch (error) {
    yield put(selectEventFilterFailure("Fetch Event FIlter fail!"));
    notifyMessageError("Fetch Event FIlter fail!");
  }
}
function* fetchFilterEventRefreshSagaWatcher() {
  yield takeLatest(selectEventFilterdReFresh.type, fetchFilterEventRefreshSaga);
}

export const feedWatchers = [
  fetchDgsLeaguesWatcher(),
  fetchSelectedDgsLeaguesSagaWatcher(),
  fetchSelectedDgsLeaguesRefreshSagaWatcher(),
  fetchExpandLeagueSagaWatcher(),
  fetchFilterEventSagaWatcher(),
  fetchFilterEventRefreshSagaWatcher(),
];
