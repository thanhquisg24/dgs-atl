import { defaultPeriodsMap, FilterTypeEnum, IDgsLineTypeEntity, IDonbestSportBookEntity, IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { CurrentTabType, IFeedModel, ILeagueInfoModel, IMapFilterLineTypeConfig, IMapFilterPeriodConfig, ISelectedGame } from "@store/models/feed-model";
import { get, isEmpty } from "lodash";
import { RootStateType } from "../types";

export const getFeed = (state: RootStateType): IFeedModel => state.feed;

export const getFeedLoading = (state: RootStateType): boolean => state.feed.isLoading;
export const getSelectedLeagueId = (state: RootStateType): number | null => state.feed.selectedDgsLeague.dgsLeagueId;
export const getSelectedLeague = (
  state: RootStateType,
): {
  dgsSportId: string | null;
  dgsLeagueId: number | null;
  mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null;
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
  defaultSelectedLineType: string | null | number;
} => state.feed.selectedDgsLeague;
export const getSelectedGame = (state: RootStateType): ISelectedGame => state.feed.selectedGame;
export const getCurrentTabselector = (state: RootStateType): CurrentTabType => state.feed.currentTabType;
export const getLeagueLeftInfoTree = (
  state: RootStateType,
): {
  [dgsLeagueId: number]: ILeagueInfoModel;
} => state.feed.leagueLeftInfo;

export const getLeagueLeftInfoList = (state: RootStateType): ILeagueInfoModel[] => Object.values(state.feed.leagueLeftInfo);

export const getListSportBook = (state: RootStateType): IDonbestSportBookEntity[] => state.feed.listDonbestSportBook;

export const getListLineType = (state: RootStateType): IDgsLineTypeEntity[] => state.feed.listDgsLineType;

export const getDgsSportIdFromSelectedLeague = (state: RootStateType): string | null => state.feed.selectedDgsLeague.dgsSportId;
export const getDefaultFilterLineTypeSetting = (state: RootStateType): IFilterLineTypeEntity | null => (state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterLineType[0] : null);
export const getDefaultFilterPeriodSetting = (state: RootStateType): IFilterPeriodEntity[] | null => {
  const { selectedDgsLeague } = state.feed;
  const result = get(defaultPeriodsMap, selectedDgsLeague.dgsSportId ? selectedDgsLeague.dgsSportId : "");
  if (isEmpty(result) === false) {
    return result;
  }
  return state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterPeriod : null;
};

export const getDefaultFilterPeriodSettingByEvent = (state: RootStateType): IFilterPeriodEntity[] => {
  const { selectedGame } = state.feed;
  let result: IFilterPeriodEntity[] = [];
  const idSport = selectedGame.gameWithLeague ? selectedGame.gameWithLeague.idSport : "";
  const sportTrimp = idSport.trim();
  result = get(defaultPeriodsMap, sportTrimp);
  if (isEmpty(result)) {
    result = state.feed.defaultFilterCombine ? state.feed.defaultFilterCombine.listFilterPeriod : [];
  }
  if (selectedGame.gameWithLeague) {
    const { dgsLeagueId, dbLeagueId, gameProviderIdGame, idGame } = selectedGame.gameWithLeague;
    const arrImmutableVersion = result.map((e) => ({
      ...e,
      dbLeagueId,
      dgsLeagueId,
      dbGameId: gameProviderIdGame,
      dgsGameId: idGame,
      type: FilterTypeEnum.EVENT,
    }));
    return arrImmutableVersion;
  }

  return [];
};

export const getStepPts = (state: RootStateType): number => {
  const { selectedGame, currentTabType, selectedDgsLeague } = state.feed;
  let idSport = "";
  if (currentTabType === CurrentTabType.LEAGUE) {
    idSport = selectedDgsLeague.dgsSportId ? selectedDgsLeague.dgsSportId : "";
  }
  if (currentTabType === CurrentTabType.GAME) {
    idSport = selectedGame.gameWithLeague ? selectedGame.gameWithLeague.idSport : "";
  }
  if (idSport.trim() === "SOC") {
    return 0.25;
  }
  return 0.5;
};
