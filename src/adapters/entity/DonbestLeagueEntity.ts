export interface IDonbestLeagueEntity {
  idLeague: number;
  dbSport: {
    idSport: number;
    name: string;
  };
  enabled: boolean;
  name: string;
  dgsIdLeague: 1;
  dgsIdSport: string;
  idSportsbook: number;
  idLeagueForOdds: number;
}
