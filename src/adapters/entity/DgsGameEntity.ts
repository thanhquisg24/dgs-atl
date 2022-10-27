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
  nodeStatus: boolean;
}
