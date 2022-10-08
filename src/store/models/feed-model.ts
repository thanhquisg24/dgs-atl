import {
  IDgsLeagueEntity,
  IDgsLineTypeEntity,
  IDonbestLeagueEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
  IFilterLineTypeEntity,
  IFilterPeriodEntity,
} from "@adapters/entity";

// eslint-disable-next-line no-shadow
export enum CurrentTabType {
  GAME = "GAME",
  LEAGUE = "LEAGUE",
}

export interface IMapFilterCombine {
  [linetypeId_sportbookId: string]: {
    filterLineTypeSetting: IFilterLineTypeEntity;
    listFilterPeriodSetting: IFilterPeriodEntity[];
  };
}
export interface IMapFilterLineTypeConfig {
  [linetypeId_sportbookId: string]: IFilterLineTypeEntity;
}
export interface IMapFilterPeriodConfig {
  [linetypeId: number]: IFilterPeriodEntity[];
}

export interface ILeagueInfoModel {
  dgsLeague: IDgsLeagueEntity;
  donbestLeague: IDonbestLeagueEntity;
  dgsGames: any[];
}

interface IFeedBaseDataFetched {
  defaultSetting: {
    lineTypeSetting: null;
    periodSetting: null;
  };
  listDgsLineType: IDgsLineTypeEntity[];
  listDonbestSportBook: IDonbestSportBookEntity[];
  leagueLeftInfo: { [dgsLeagueId: number]: ILeagueInfoModel };
  defaultFilterCombine: IFilterCombine | null;
}

interface IFeedUiAction {
  selectedDgsLeague: {
    dgsLeagueId: number | null;
    mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null;
    mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
    defaultSelectedLineType_BookId: string | null;
  };
  selectedGameId: number | null;
  isLoading: boolean;
  currentTabType: CurrentTabType;
}

export interface IFeedModel extends IFeedBaseDataFetched, IFeedUiAction {}
