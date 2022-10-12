import { IDgsGameEntityWithLeague } from "@adapters/entity";
import { createReducer } from "@reduxjs/toolkit";
import {
  expandLeagueSuccess,
  fetchLeagueInfoTreeSuccess,
  selectEventFilterSuccess,
  selectLeagueIdSuccess,
} from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel, IMapFilterLineTypeConfig, IMapFilterPeriodConfig } from "@store/models/feed-model";
import {
  buildDgsLeaguesTree,
  buildKeyLineType,
  buildMapFilterLineType,
  buildMapFilterPeriod,
} from "@store/utils/feed-utils";

export const initialFeedState: IFeedModel = {
  selectedGame: null,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
  selectedDgsLeague: {
    dgsLeagueId: null,
    mapFilterLineTypeConfig: null,
    mapFilterPeriodConfig: null,
    defaultSelectedLineType: null,
  },
  leagueLeftInfo: {},
  defaultSetting: {
    lineTypeSetting: null,
    periodSetting: null,
  },
  listDgsLineType: [],
  listDonbestSportBook: [],
  defaultFilterCombine: null,
};

const feedReducer = createReducer(initialFeedState as IFeedModel, (builder) => {
  builder.addCase(selectLeagueIdSuccess, (state, action) => {
    const newState = { ...state };
    const listLineTypeConfig = action.payload.filterCombine?.listFilterLineType;
    const mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null = buildMapFilterLineType(listLineTypeConfig);
    const mapFilterPeriodConfig: IMapFilterPeriodConfig | null = buildMapFilterPeriod(
      action.payload.filterCombine?.listFilterPeriod,
    );
    newState.selectedDgsLeague = {
      dgsLeagueId: action.payload.id,
      mapFilterLineTypeConfig,
      mapFilterPeriodConfig,
      defaultSelectedLineType: listLineTypeConfig ? buildKeyLineType(listLineTypeConfig[0].lineTypeId) : null,
    };
    newState.isLoading = false;
    newState.currentTabType = CurrentTabType.LEAGUE;
    return newState;
  });
  builder.addCase(expandLeagueSuccess, (state, action) => {
    const gamesWithLeague: IDgsGameEntityWithLeague[] = action.payload.list.map((e) => ({
      ...e,
      dgsLeagueId: action.payload.dgsLeagueId,
    }));
    state.leagueLeftInfo[action.payload.dgsLeagueId].dgsGames = gamesWithLeague;
    state.isLoading = false;
    return state;
  });

  builder.addCase(selectEventFilterSuccess, (state, action) => {
    state.currentTabType = CurrentTabType.GAME;
    state.selectedGame = action.payload;
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
    newState.isLoading = false;
    return newState;
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
