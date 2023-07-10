import { buildItemEventFromDonbestInfo, IDgsGameEntityWithLeague } from "@adapters/entity";
import { buildKeyFromDgs, IMapDonbestEventWithIdGame } from "@adapters/entity/DonbestEventInfo";
import { createReducer } from "@reduxjs/toolkit";
import { expandLeagueSuccess, fetchLeagueInfoTreeSuccess, selectEventFilterSuccess, selectLeagueIdSuccess, switchTabAction } from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel, IMapFilterLineTypeConfig, IMapFilterPeriodConfig } from "@store/models/feed-model";
import { buildDgsLeaguesTree, buildKeyLineType, buildMapFilterLineType, buildMapFilterPeriod } from "@store/utils/feed-utils";
import { has, set } from "lodash";

const defaultSelectedGame = {
  mapFilterPeriodConfig: null,
  gameWithLeague: null,
  defaultSelectedLineType: 0,
  eventLineTypes: [],
};
export const initialFeedState: IFeedModel = {
  selectedGame: defaultSelectedGame,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
  selectedDgsLeague: {
    dgsLeagueId: null,
    dgsSportId: null,
    mapFilterLineTypeConfig: null,
    mapFilterPeriodConfig: null,
    defaultSelectedLineType: 0,
  },
  leagueLeftInfo: {},
  defaultSetting: {
    lineTypeSetting: null,
    periodSetting: null,
  },
  dbIdGameMap: {},
  listDgsLineType: [],
  listDonbestSportBook: [],
  defaultFilterCombine: null,
};

const feedReducer = createReducer(initialFeedState as IFeedModel, (builder) => {
  builder.addCase(selectLeagueIdSuccess, (state, action) => {
    const newState = { ...state };
    const listLineTypeConfig = action.payload.filterCombine?.listFilterLineType;
    const mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null = buildMapFilterLineType(listLineTypeConfig);
    const mapFilterPeriodConfig: IMapFilterPeriodConfig | null = buildMapFilterPeriod(action.payload.filterCombine?.listFilterPeriod);
    // eslint-disable-next-line no-nested-ternary
    const defaultSelectedLineTypeInlist = listLineTypeConfig ? (listLineTypeConfig.length > 0 ? buildKeyLineType(listLineTypeConfig[0].lineTypeId) : null) : null;
    newState.selectedDgsLeague = {
      dgsSportId: action.payload.dgsSportId,
      dgsLeagueId: action.payload.id,
      mapFilterLineTypeConfig,
      mapFilterPeriodConfig,
      // eslint-disable-next-line no-nested-ternary
      defaultSelectedLineType: action.payload.defaultSelectedLineType ? action.payload.defaultSelectedLineType : defaultSelectedLineTypeInlist,
    };
    newState.isLoading = false;
    newState.currentTabType = CurrentTabType.LEAGUE;
    if (action.payload.clearSelectedGame) {
      newState.selectedGame = defaultSelectedGame;
    }
    return newState;
  });
  builder.addCase(expandLeagueSuccess, (state, action) => {
    let countGameFail = 0;
    const keySportLeague = buildKeyFromDgs(action.payload.dbSportId, action.payload.dbLeagueId);
    // const exampleItem: IDonbestEventInfo = {
    //   dbSportId: 0,
    //   dbLeagueId: 0,
    //   idGame: 9999999,
    //   awayRot: 9999,
    //   date: "",
    //   time: "",
    //   awayTeam: "example away missing",
    //   utc: "2022-11-06T04:00:00.000+00:00",
    //   isCheck: false,
    // };
    const mapEvent: IMapDonbestEventWithIdGame = JSON.parse(JSON.stringify({ ...state.dbIdGameMap[keySportLeague] }));

    const gamesWithLeague: IDgsGameEntityWithLeague[] = action.payload.list.map((e) => {
      const isStatus = has(mapEvent, e.gameProviderIdGame);
      if (isStatus === false) {
        countGameFail += 1;
      }
      set(mapEvent, "isCheck", true);
      return {
        ...e,
        dgsLeagueId: action.payload.dgsLeagueId,
        dbLeagueId: action.payload.dbLeagueId,
        dbSportId: action.payload.dbSportId,
        nodeStatus: isStatus,
      };
    });
    // eslint-disable-next-line array-callback-return
    Object.values(mapEvent).map((e) => {
      if (e.isCheck === false) {
        const itemEventLossFromDonbest: IDgsGameEntityWithLeague = buildItemEventFromDonbestInfo(e);
        gamesWithLeague.push(itemEventLossFromDonbest);
      }
    });
    state.leagueLeftInfo[action.payload.dgsLeagueId].dgsGames = gamesWithLeague;
    state.leagueLeftInfo[action.payload.dgsLeagueId].countGameFail = countGameFail;
    state.isLoading = false;
    return state;
  });

  builder.addCase(selectEventFilterSuccess, (state, action) => {
    state.currentTabType = CurrentTabType.GAME;
    const mapFilterPeriodConfig: IMapFilterPeriodConfig | null = buildMapFilterPeriod(action.payload.eventFilterPeriodConfig);
    state.selectedGame = {
      mapFilterPeriodConfig,
      gameWithLeague: action.payload.gameWithLeague,
      defaultSelectedLineType: action.payload.defaultSelectedLineType,
      eventLineTypes: action.payload.eventLineTypes,
    };
    state.isLoading = false;
    return state;
  });

  builder.addCase(fetchLeagueInfoTreeSuccess, (state, action) => {
    const newState = { ...state };
    const leagueLeftInfo = buildDgsLeaguesTree(action.payload.listDgsLeague, action.payload.listDonbestLeague);
    newState.leagueLeftInfo = leagueLeftInfo;
    newState.listDgsLineType = action.payload.listDgsLineType;
    newState.listDonbestSportBook = action.payload.listDonbestSportBook;
    newState.defaultFilterCombine = action.payload.defaultFilterCombine;
    newState.dbIdGameMap = action.payload.dbIdGames;
    newState.isLoading = false;
    return newState;
  });

  builder.addCase(switchTabAction, (state, action) => {
    state.currentTabType = action.payload;
    return state;
  });

  builder.addMatcher(
    (action) => action.type.endsWith("_REQUEST"),
    (state) => ({ ...state, isLoading: true }),
  );
  builder.addMatcher(
    (action) => action.type.endsWith("_FAILURE"),
    (state) => ({ ...state, isLoading: false }),
  );
  builder.addMatcher(
    (action) => action.type.endsWith("_NOTCHANGE"),
    (state) => ({ ...state, isLoading: false }),
  );
});

export default feedReducer;
