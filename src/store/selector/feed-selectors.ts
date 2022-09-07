import { CurrentTabType } from "@store/models/feed-model";
import { RootStateType } from "../types";

export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedLeagueId;
export const getSelectedGameId = (state: RootStateType): number | null => state.feed.selectedGameId;
export const getCurrentTabselector = (state: RootStateType): CurrentTabType => state.feed.currentTabType;
