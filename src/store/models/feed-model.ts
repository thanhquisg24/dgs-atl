import { IDgsLeagueEntity } from "@adapters/entity/DgsLeagueEntity";

// eslint-disable-next-line no-shadow
export enum CurrentTabType {
  GAME = "GAME",
  LEAGUE = "LEAGUE",
}

export interface ILeagueInfoModel extends IDgsLeagueEntity {
  dgsGames: any[];
}

export interface IFeedModel {
  selectedDgsLeague: IDgsLeagueEntity | null;
  selectedLeagueId: number | null;
  selectedGameId: number | null;
  isLoading: boolean;
  currentTabType: CurrentTabType;
  leagueLeftInfo: { [dgsLeagueId: number]: ILeagueInfoModel };
  defaultSetting: {
    lineTypeSetting: null;
    periodSetting: null;
  };
}
