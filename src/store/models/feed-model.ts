import {
  IDgsGameEntityWithLeague,
  IDgsLeagueEntity,
  IDgsLineTypeEntity,
  IDonbestLeagueEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
  IFilterLineTypeEntity,
  IFilterPeriodEntity,
} from "@adapters/entity";
import { IMapDonbestEventInfo } from "@adapters/entity/DonbestEventInfo";

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
  dgsGames: IDgsGameEntityWithLeague[];
  countGameFail: number;
}

interface IFeedBaseDataFetched {
  defaultSetting: {
    lineTypeSetting: null;
    periodSetting: null;
  };
  listDgsLineType: IDgsLineTypeEntity[];
  listDonbestSportBook: IDonbestSportBookEntity[];
  leagueLeftInfo: { [dgsLeagueId: number]: ILeagueInfoModel };
  dbIdGameMap: IMapDonbestEventInfo;
  defaultFilterCombine: IFilterCombine | null;
}
export interface ISelectedGame {
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
  gameWithLeague: IDgsGameEntityWithLeague | null;
  defaultSelectedLineType: string | null | number;
  eventLineTypes: IDgsLineTypeEntity[];
}
interface IFeedUiAction {
  selectedDgsLeague: {
    dgsLeagueId: number | null;
    dgsSportId: string | null;
    mapFilterLineTypeConfig: IMapFilterLineTypeConfig | null;
    mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
    defaultSelectedLineType: string | null | number;
  };
  selectedGame: ISelectedGame;
  isLoading: boolean;
  currentTabType: CurrentTabType;
}

export interface IFeedModel extends IFeedBaseDataFetched, IFeedUiAction {}
