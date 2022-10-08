import { createReducer } from "@reduxjs/toolkit";
import { fetchLeagueInfoTreeSuccess, selectGameIdSuccess, selectLeagueIdSuccess } from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel, IMapFilterLineTypeConfig, IMapFilterPeriodConfig } from "@store/models/feed-model";
import {
  buildDgsLeaguesTree,
  buildKeyLineTypeAndSportbook,
  buildMapFilterLineType,
  buildMapFilterPeriod,
} from "@store/utils/feed-utils";

export const initialFeedState: IFeedModel = {
  selectedGameId: null,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
  selectedDgsLeague: {
    dgsLeagueId: null,
    mapFilterLineTypeConfig: null,
    mapFilterPeriodConfig: null,
    defaultSelectedLineType_BookId: null,
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
      defaultSelectedLineType_BookId: listLineTypeConfig
        ? buildKeyLineTypeAndSportbook(listLineTypeConfig[0].lineTypeId, listLineTypeConfig[0].bookId)
        : null,
    };
    newState.isLoading = false;
    newState.currentTabType = CurrentTabType.LEAGUE;
    return newState;
  });

  builder.addCase(selectGameIdSuccess, (state, action) => {
    const newState = { ...state };
    newState.selectedGameId = action.payload.id;
    newState.currentTabType = CurrentTabType.GAME;
    newState.isLoading = false;
    return newState;
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
});

export default feedReducer;
