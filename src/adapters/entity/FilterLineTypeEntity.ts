import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterLineTypeEntity {
  id: number | null;

  type: FilterTypeEnum;

  lineTypeId: number;

  dgsLeagueId: number;

  dgsGameId: number | null;

  bookId: number;

  enabled: boolean;

  time1Enabled: boolean;

  time1Start: string;

  time1End: string;

  autoScore: boolean;
  autoScoreOffset: number;
  autoTimeChange: boolean;
  autoTimeChangeOffset: number;
  useOddsBySports: boolean;
  useDGSLinkedLineTypes: boolean;
  preserveFavoriteJuice: boolean;
  ignoreMLOver: number;
  ignorePSOver: number;
  ignoreTotalOver: number;
  ignoreMLUnder: number;
  ignorePSUnder: number;
  ignoreTotalUnder: number;
  ignoreTotalJuiceOver: number;
  ignoreTotalJuiceUnder: number;
  ignorePSJuiceOver: number;
  ignorePSJuiceUnder: number;
  showFlatLine: boolean;
  useRounding: boolean;
  ignorePSTD: boolean;

  ignoreMLTD: boolean;

  ignoreTotalTD: boolean;
  ignorePSJCTD: boolean;
  ignoreTotalJCTD: boolean;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r6: number;
  r7: number;
  r8: number;
  r9: number;
  followParentExcept: boolean;
  byPassSyncWhenTD: boolean;
  lockPSAwayJuice: number;
  lockPSHomeJuice: number;
  lockTotalOverJuice: number;
  lockTotalUnderJuice: number;
  totalGoToOverUnderRotation: boolean;
  roundingOnPS: boolean;
  roundingOnML: boolean;
  roundingOnTotal: boolean;
  ignoreTeamTotalTD: boolean;
  ignoreTeamTotalJCTD: boolean;
  ignoreTeamTotalUnder: number;
  ignoreTeamTotalOver: number;
  ignoreTeamTotalJuiceOver: number;
  ignoreTeamTotalJuiceUnder: number;
  ignoreMLRangeTD: boolean;
  ignoreMLRangeOver: number;
  ignoreMLRangeUnder: number;
  ignorePSSpecific: number;

  dbGameId: number | null;
  dbLeagueId: number | null;
}
