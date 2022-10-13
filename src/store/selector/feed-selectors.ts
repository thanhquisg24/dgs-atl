import {
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
} from "@store/models/feed-model";
import { RootStateType } from "../types";

export const getFeedLoading = (state: RootStateType): boolean => state.feed.isLoading;
export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedDgsLeague.dgsLeagueId;
export const getSelectedLeague = (
  state: RootStateType,
): {
  dgsLeagueId: number | null;
  mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null;
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
  defaultSelectedLineType: string | null;
} => state.feed.selectedDgsLeague;
export const getSelectedGame = (
  state: RootStateType,
): {
  eventFilterPeriodConfig: IFilterPeriodEntity | null;
  gameWithLeague: IDgsGameEntityWithLeague | null;
} => state.feed.selectedGame;
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
export const getDefaultFilterPeriodSetting = (state: RootStateType): IFilterPeriodEntity[] | null =>
  state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterPeriod : null;
