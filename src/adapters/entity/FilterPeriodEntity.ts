import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterPeriodEntity {
  id: number | null;
  type: FilterTypeEnum;
  lineTypeId: number;
  dgsLeagueId: number;
  dgsGameId: number | null;
  period: number;
  enabled: boolean;
  ps: boolean;
  ml: boolean;
  total: boolean;
  team_total: boolean;
  way3: boolean;
  ps_bookId: number;
  ml_bookId: number;
  total_bookId: number;
  team_total_bookId: number;
  way3_bookId: number;
  ps_po: number;
  ps_juice: number;
  ml_po: number;
  ml_juice: number;
  total_po: number;
  total_juice: number;
  team_total_po: number;
  team_total_juice: number;
  way3_po: number;
  way3_juice: number;
  dbGameId: number | null;
  dbLeagueId: number | null;
}
