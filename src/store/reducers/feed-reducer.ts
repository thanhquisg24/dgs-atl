import { createReducer } from "@reduxjs/toolkit";
import { selectGameIdSuccess, selectLeagueIdSuccess } from "@store/actions/feed-action";
import { CurrentTabType, IFeedModel } from "@store/models/feed-model";

export const initialFeedState: IFeedModel = {
  selectedLeagueId: null,
  selectedGameId: null,
  isLoading: false,
  currentTabType: CurrentTabType.LEAGUE,
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
  builder.addMatcher(
    (action) => action.type.endsWith("_REQUEST"),
    (state) => ({ ...state, isLoading: true }),
  );
});

export default feedReducer;
