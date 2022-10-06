import { IDgsLineTypeEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { CurrentTabType, ILeagueInfoModel } from "@store/models/feed-model";
import { RootStateType } from "../types";

export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedLeagueId;
export const getSelectedGameId = (state: RootStateType): number | null => state.feed.selectedGameId;
export const getCurrentTabselector = (state: RootStateType): CurrentTabType => state.feed.currentTabType;
export const getLeagueLeftInfoTree = (
  state: RootStateType,
): {
  [dgsLeagueId: number]: ILeagueInfoModel;
} => state.feed.leagueLeftInfo;

export const getLeagueLeftInfoList = (state: RootStateType): ILeagueInfoModel[] =>
  Object.values(state.feed.leagueLeftInfo);

export const getListSportBook = (state: RootStateType): IDonbestSportBookEntity[] => state.feed.listDonbestSportBook;

export const getListLineType = (state: RootStateType): IDgsLineTypeEntity[] => state.feed.listDgsLineType;
