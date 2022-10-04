import { CurrentTabType, ILeagueInfoModel } from "@store/models/feed-model";
import { RootStateType } from "../types";

export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedLeagueId;
export const getSelectedGameId = (state: RootStateType): number | null => state.feed.selectedGameId;
export const getCurrentTabselector = (state: RootStateType): CurrentTabType => state.feed.currentTabType;
export const getDgsLeagueTree = (
  state: RootStateType,
): {
  [dgsLeagueId: number]: ILeagueInfoModel;
} => state.feed.leagueLeftInfo;

export const getDgsLeagueList = (state: RootStateType): ILeagueInfoModel[] => Object.values(state.feed.leagueLeftInfo);
