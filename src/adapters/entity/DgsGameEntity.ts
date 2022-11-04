import { IDonbestEventInfo } from "./DonbestEventInfo";

export interface IDgsGameEntity {
  idGame: number;
  idEvent: number;
  visitorTeam: string;
  homeTeam: string;
  idSport: string;
  idGameType: number;
  gameDateTime: string;
  normalGame: number;
  visitorNumber: number;
  homeNumber: number;
  gameStat: string;
  graded: boolean;
  hookUps: boolean;
  online: boolean;
  onLocal: boolean;
  numberGame: boolean;
  eventDate: string;
  dateChanged: boolean;
  timeChanged: boolean;
  period: number;
  familyGame: number;
  hasChildren: boolean;
  visitorScore: number;
  homeScore: number;
  visitorPitcher: string;
  homePitcher: string;
  gradedDate: string;
  numTeams: number;
  pitcherChanged: number;
  lastModification: string;
  lastModificationUser: number;
  idTeamVisitor: number;
  idTeamHome: number;
  idBannerType: number;
  description: string;
  acceptAutoChanges: boolean;
  derivOptions: number;
  gameProviderIdGame: number;
  idGameProvider: number;
  noRelated: boolean;
  totalMaxLines: number;
  tournamentplacestoPaid: number;
  tournamentType: number;
  winnerTeam: number;
}
export interface IDgsGameEntityWithLeague extends IDgsGameEntity {
  dgsLeagueId: number;
  dbLeagueId: number;
  dbSportId: number;
  nodeStatus: boolean | null;
}

export function buildItemEventFromDonbestInfo(dbinfo: IDonbestEventInfo): IDgsGameEntityWithLeague {
  const itemEventLossFromDonbest: IDgsGameEntityWithLeague = {
    dgsLeagueId: -1,
    dbLeagueId: dbinfo.dbLeagueId,
    dbSportId: dbinfo.dbSportId,
    nodeStatus: null,
    idGame: -1,
    idEvent: -1,
    visitorTeam: dbinfo.awayTeam,
    homeTeam: "",
    idSport: "",
    idGameType: 0,
    gameDateTime: dbinfo.utc,
    normalGame: 0,
    visitorNumber: dbinfo.awayRot,
    homeNumber: 0,
    gameStat: "",
    graded: false,
    hookUps: false,
    online: false,
    onLocal: false,
    numberGame: false,
    eventDate: "",
    dateChanged: false,
    timeChanged: false,
    period: 0,
    familyGame: 0,
    hasChildren: false,
    visitorScore: 0,
    homeScore: 0,
    visitorPitcher: "",
    homePitcher: "",
    gradedDate: "",
    numTeams: 0,
    pitcherChanged: 0,
    lastModification: "",
    lastModificationUser: 0,
    idTeamVisitor: 0,
    idTeamHome: 0,
    idBannerType: 0,
    description: "",
    acceptAutoChanges: false,
    derivOptions: 0,
    gameProviderIdGame: 0,
    idGameProvider: 0,
    noRelated: false,
    totalMaxLines: 0,
    tournamentplacestoPaid: 0,
    tournamentType: 0,
    winnerTeam: 0,
  };
  return itemEventLossFromDonbest;
}
