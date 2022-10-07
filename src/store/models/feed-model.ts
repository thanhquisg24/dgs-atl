import {
  IDgsLeagueEntity,
  IDgsLineTypeEntity,
  IDonbestLeagueEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
} from "@adapters/entity";

// eslint-disable-next-line no-shadow
export enum CurrentTabType {
  GAME = "GAME",
  LEAGUE = "LEAGUE",
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
    filterCombine: IFilterCombine | null;
  };
  selectedGameId: number | null;
  isLoading: boolean;
  currentTabType: CurrentTabType;
}

export interface IFeedModel extends IFeedBaseDataFetched, IFeedUiAction {}
