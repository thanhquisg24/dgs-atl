import { createReducer } from "@reduxjs/toolkit";
import { fetchLeagueInfoTreeSuccess, selectGameIdSuccess, selectLeagueIdSuccess } from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel } from "@store/models/feed-model";
import { buildDgsLeaguesTree } from "@store/utils/feed-utils";

export const initialFeedState: IFeedModel = {
  selectedGameId: null,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
  selectedDgsLeague: { dgsLeagueId: null, filterCombine: null },
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
    newState.selectedDgsLeague = { dgsLeagueId: action.payload.id, filterCombine: action.payload.filterCombine };
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
