import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterLineTypeEntity {
  type: FilterTypeEnum;
  lineTypeId: number;
  dgsLeagueId: number;
  dgsGameId: number;
  dbSportsBookId: number;
  enabled: boolean;
  autoScore: boolean;
  autoTimeChange: boolean;
  useOddsBySports: boolean;
  // useDGSLinkedLineTypes: boolean;
  preserveFavoriteJuice: boolean;
  followParentExcept: boolean;

  ignoreMLOver: number | null;
  ignorePSOver: number | null;
  ignoreTotalOver: number | null;
  ignoreMLUnder: number | null;
  ignorePSUnder: number | null;
  ignoreTotalUnder: number | null;
  ignoreTotalJuiceOver: number | null;
  ignoreTotalJuiceUnder: number | null;
  ignorePSJuiceOver: number | null;
  ignorePSJuiceUnder: number | null;
  ignorePSTD: boolean;

  ignoreMLTD: boolean;

  ignoreTotalTD: boolean;
  ignorePSJCTD: boolean;
  ignoreTotalJCTD: boolean;
  lockPSAwayJuice: number | null;
  lockPSHomeJuice: number | null;
  lockTotalOverJuice: number | null;
  lockTotalUnderJuice: number | null;

  ignoreTeamTotalTD: boolean;
  ignoreTeamTotalJCTD: boolean;
  ignoreTeamTotalUnder: number | null;
  ignoreTeamTotalOver: number | null;
  ignoreTeamTotalJuiceOver: number | null;
  ignoreTeamTotalJuiceUnder: number | null;
  ignoreMLRangeTD: boolean;
  ignoreMLRangeOver: number | null;
  ignoreMLRangeUnder: number | null;
  // autoTimeChangeOffset: number | null;
  dbLeagueId: number | null;
}
