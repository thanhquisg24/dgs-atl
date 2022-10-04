import { createReducer } from "@reduxjs/toolkit";
import { fetchDgsLeaguesSuccess, selectGameIdSuccess, selectLeagueIdSuccess } from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel } from "@store/models/feed-model";
import { buildDgsLeaguesTree } from "@store/utils/feed-utils";

export const initialFeedState: IFeedModel = {
  selectedLeagueId: null,
  selectedGameId: null,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
  selectedDgsLeague: null,
  leagueLeftInfo: {},
  defaultSetting: {
    lineTypeSetting: null,
    periodSetting: null,
  },
};

const feedReducer = createReducer(initialFeedState as IFeedModel, (builder) => {
  builder.addCase(selectLeagueIdSuccess, (state, action) => {
    const newState = { ...state };
    newState.selectedLeagueId = action.payload.id;
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
  builder.addCase(fetchDgsLeaguesSuccess, (state, action) => {
    const newState = { ...state };
    const leagueLeftInfo = buildDgsLeaguesTree(action.payload);
    newState.leagueLeftInfo = leagueLeftInfo;
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
