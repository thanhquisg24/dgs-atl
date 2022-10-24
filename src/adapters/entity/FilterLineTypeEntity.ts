import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterLineTypeEntity {
  id: number;
  type: FilterTypeEnum;
  lineTypeId: number;
  dgsLeagueId: number;
  dgsGameId: number;
  dbSportsBookId: number;
  enabled: boolean;
  autoTimeChange: boolean;
  useOddsBySports: boolean;
  autoScore: boolean;
  // useDGSLinkedLineTypes: boolean;
  preserveFavoriteJuice: boolean;
  // followParentExcept: boolean;

  ignoreMLHigher: number | null;
  ignorePSHigher: number | null;
  ignoreTotalHigher: number | null;
  ignoreMLLower: number | null;
  ignorePSLower: number | null;
  ignoreTotalLower: number | null;
  ignoreTotalJuiceHigher: number | null;
  ignoreTotalJuiceLower: number | null;
  ignorePSJuiceHigher: number | null;
  ignorePSJuiceLower: number | null;
  ignorePSTD: boolean;
  ignoreMLTD: boolean;
  ignoreTotalTD: boolean;
  ignorePSJCTD: boolean;
  ignoreTotalJCTD: boolean;
  // lockPSAwayJuice: number | null;
  // lockPSHomeJuice: number | null;
  // lockTotalHigherJuice: number | null;
  // lockTotalLowerJuice: number | null;

  // ignoreTeamTotalTD: boolean;
  // ignoreTeamTotalJCTD: boolean;
  // ignoreTeamTotalLower: number | null;
  // ignoreTeamTotalHigher: number | null;
  // ignoreTeamTotalJuiceHigher: number | null;
  // ignoreTeamTotalJuiceLower: number | null;
  ignoreMLRangeTD: boolean;
  ignoreMLRangeHigher: number | null;
  ignoreMLRangeLower: number | null;
  // autoTimeChangeOffset: number | null;
  dbLeagueId: number | null;
  dbSportId: number;
}
