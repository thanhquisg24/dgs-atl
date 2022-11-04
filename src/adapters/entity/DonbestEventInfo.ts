export interface IDonbestEventInfo {
  dbSportId: number;
  dbLeagueId: number;
  idGame: number;
  awayRot: number;
  date: string;
  time: string;
  awayTeam: string;
  utc: string;
  isCheck: boolean;
}
export interface IMapDonbestEventWithIdGame {
  [idGame: number]: IDonbestEventInfo;
}

export interface IMapDonbestEventInfo {
  [sportId_LeagueId: string]: IMapDonbestEventWithIdGame;
}

export function buildKey(item: IDonbestEventInfo) {
  return `${item.dbSportId}_${item.dbLeagueId}`;
}
export function buildKeyFromDgs(dbSportId: number, dbLeagueId: number) {
  return `${dbSportId}_${dbLeagueId}`;
}
