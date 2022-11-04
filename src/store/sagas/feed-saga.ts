import { all, put, select, takeLatest } from "redux-saga/effects";
import { emitStartLoading, emitStopLoading, notifyMessageError } from "@emiter/AppEmitter";
import {
  expandLeagueFailure,
  expandLeagueRequest,
  expandLeagueSuccess,
  fetchLeagueInfoTreeFailure,
  fetchLeagueInfoTreeRequest,
  fetchLeagueInfoTreeSuccess,
  rereshDataAction,
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
import { getFeed, getLeagueLeftInfoTree, getSelectedLeagueId } from "@store/selector";
import { CurrentTabType, IFeedModel, ILeagueInfoModel } from "@store/models/feed-model";
import { IEventFilterEntity } from "@adapters/entity/EventFilterEntity";

function* fetchDgsLeaguesSaga(): Generator | any {
  try {
    emitStartLoading();
    const [listDgs, listDonbest, lineTypes, sportBooks, defaultCombine, dbIdGames] = yield all([
      diRepositorires.dgsLeague.fetAvaiableDgsLeague(),
      diRepositorires.donbestLeague.fetAvaiableDonbestLeague(),
      diRepositorires.dgsLeague.fetchAvaiableDgsLineType(),
      diRepositorires.donbestLeague.fetAvaiableDonbestSportBook(),
      diRepositorires.donbestFilter.fetDefaultFilterCombine(),
      diRepositorires.donbestFilter.fetDonbestIdGames(),
    ]);

    yield put(
      fetchLeagueInfoTreeSuccess({
        listDgsLeague: listDgs,
        listDonbestLeague: listDonbest,
        listDgsLineType: lineTypes,
        listDonbestSportBook: sportBooks,
        defaultFilterCombine: defaultCombine,
        dbIdGames,
      }),
    );
    emitStopLoading();
  } catch (error) {
    yield put(fetchLeagueInfoTreeFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
    emitStopLoading();
  }
}

function* fetchDgsLeaguesWatcher() {
  yield takeLatest(fetchLeagueInfoTreeRequest.type, fetchDgsLeaguesSaga);
}
function* fetchSelectedDgsLeaguesSaga(action: ReturnType<typeof selectLeagueIdRequest>): Generator | any {
  try {
    const prevSelect = yield select(getSelectedLeagueId);
    if (prevSelect !== action.payload) {
      const lueagueCombineConfig = yield diRepositorires.donbestFilter.fetFilterCombine(FilterTypeEnum.LEAGUE, action.payload.dgsLeagueId, 0);
      const leagueTree: { [dgsLeagueId: number]: ILeagueInfoModel } = yield select(getLeagueLeftInfoTree);
      const dgsSportId = leagueTree[action.payload.dgsLeagueId].dgsLeague.idSport;
      yield put(
        selectLeagueIdSuccess({
          id: action.payload.dgsLeagueId,
          dgsSportId,
          filterCombine: lueagueCombineConfig,
          defaultSelectedLineType: null,
        }),
      );
    } else {
      yield put(selectLeagueIdNotChanged());
    }
  } catch (error) {
    yield put(selectLeagueIdFailure("Fetch DgsLeagues fail!"));
    notifyMessageError("Fetch DgsLeagues fail!");
  }
}

function* fetchSelectedDgsLeaguesSagaWatcher() {
  yield takeLatest(selectLeagueIdRequest.type, fetchSelectedDgsLeaguesSaga);
}

function* fetchSelectedDgsLeaguesRefreshSaga(action: ReturnType<typeof selectLeagueIdRefresh>): Generator | any {
  try {
    const lueagueCombineConfig = yield diRepositorires.donbestFilter.fetFilterCombine(FilterTypeEnum.LEAGUE, action.payload.dgsLeagueId, 0);
    const leagueTree: { [dgsLeagueId: number]: ILeagueInfoModel } = yield select(getLeagueLeftInfoTree);
    const dgsSportId = leagueTree[action.payload.dgsLeagueId].dgsLeague.idSport;
    yield put(
      selectLeagueIdSuccess({
        id: action.payload.dgsLeagueId,
        dgsSportId,
        filterCombine: lueagueCombineConfig,
        defaultSelectedLineType: action.payload.defaultSelectedLineType,
        clearSelectedGame: action.payload.clearSelectedGame,
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
    const dbSportId = infoTree[action.payload].donbestLeague.dbSport.idSport;
    yield put(expandLeagueSuccess({ dbSportId, dbLeagueId, dgsLeagueId: Number(action.payload), list: DgsGames }));
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
    const eventPeriodFilters: IEventFilterEntity = yield diRepositorires.donbestFilter.fetEventFilter(dgsLeagueId, idGame);
    // eslint-disable-next-line operator-linebreak
    const defaultSelectedLineType = eventPeriodFilters.eventFilterPeriod.length > 0 ? eventPeriodFilters.eventFilterPeriod[0].lineTypeId : 0;
    const data = {
      eventFilterPeriodConfig: eventPeriodFilters.eventFilterPeriod,
      eventLineTypes: eventPeriodFilters.eventLineTypes,
      gameWithLeague: action.payload,
      defaultSelectedLineType,
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
      eventFilterPeriodConfig: eventPeriodFilters.eventFilterPeriod,
      eventLineTypes: eventPeriodFilters.eventLineTypes,
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

function* refreshDataSaga(): Generator | any {
  try {
    const feedState: IFeedModel = yield select(getFeed);
    if (feedState.currentTabType === CurrentTabType.LEAGUE) {
      const { dgsLeagueId, defaultSelectedLineType } = feedState.selectedDgsLeague;
      if (dgsLeagueId !== null) {
        const lueagueCombineConfig = yield diRepositorires.donbestFilter.fetFilterCombine(FilterTypeEnum.LEAGUE, dgsLeagueId, 0);
        const leagueTree: { [dgsLeagueId: number]: ILeagueInfoModel } = yield select(getLeagueLeftInfoTree);
        const dgsSportId = leagueTree[dgsLeagueId].dgsLeague.idSport;
        yield put(
          selectLeagueIdSuccess({
            id: dgsLeagueId,
            dgsSportId,
            filterCombine: lueagueCombineConfig,
            defaultSelectedLineType,
            clearSelectedGame: true,
          }),
        );
      }
    } else {
      const { gameWithLeague, defaultSelectedLineType } = feedState.selectedGame;
      if (gameWithLeague) {
        yield put(
          selectEventFilterdReFresh({
            gameWithLeague,
            defaultSelectedLineType,
          }),
        );
      }
    }
  } catch (error) {
    notifyMessageError("Refresh data fail!");
  }
}
function* refreshDataSagaWatcher() {
  yield takeLatest(rereshDataAction.type, refreshDataSaga);
}

export const feedWatchers = [
  fetchDgsLeaguesWatcher(),
  fetchSelectedDgsLeaguesSagaWatcher(),
  fetchSelectedDgsLeaguesRefreshSagaWatcher(),
  fetchExpandLeagueSagaWatcher(),
  fetchFilterEventSagaWatcher(),
  fetchFilterEventRefreshSagaWatcher(),
  refreshDataSagaWatcher(),
];
