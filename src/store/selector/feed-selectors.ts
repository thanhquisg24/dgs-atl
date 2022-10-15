import {
  defaultNHLPeriods,
  IDgsGameEntityWithLeague,
  IDgsLineTypeEntity,
  IDonbestSportBookEntity,
  IFilterLineTypeEntity,
  IFilterPeriodEntity,
} from "@adapters/entity";
import {
  CurrentTabType,
  ILeagueInfoModel,
  IMapFilterLineTypeConfig,
  IMapFilterPeriodConfig,
  ISelectedGame,
} from "@store/models/feed-model";
import { RootStateType } from "../types";

export const getFeedLoading = (state: RootStateType): boolean => state.feed.isLoading;
export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedDgsLeague.dgsLeagueId;
export const getSelectedLeague = (
  state: RootStateType,
): {
  dgsSportId: string | null;
  dgsLeagueId: number | null;
  mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null;
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
  defaultSelectedLineType: string | null;
} => state.feed.selectedDgsLeague;
export const getSelectedGame = (state: RootStateType): ISelectedGame => state.feed.selectedGame;
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

export const getDefaultFilterLineTypeSetting = (state: RootStateType): IFilterLineTypeEntity | null =>
  state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterLineType[0] : null;
export const getDefaultFilterPeriodSetting = (state: RootStateType): IFilterPeriodEntity[] | null => {
  const { selectedDgsLeague } = state.feed;
  if (selectedDgsLeague.dgsSportId === "NHL") {
    return defaultNHLPeriods;
  }
  return state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterPeriod : null;
};
