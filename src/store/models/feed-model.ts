// eslint-disable-next-line no-shadow
export enum CurrentTabType {
  GAME = "GAME",
  LEAGUE = "LEAGUE",
}

export interface IFeedModel {
  selectedLeagueId: number | null;
  selectedGameId: number | null;
  isLoading: boolean;
  currentTabType: CurrentTabType;
}
