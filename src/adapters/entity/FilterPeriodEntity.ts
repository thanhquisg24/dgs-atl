import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterPeriodEntity {
  id: number | null;
  type: FilterTypeEnum;
  lineTypeId: number;
  dgsLeagueId: number;
  dgsGameId: number;
  period: number;
  enabled: boolean;
  ps: boolean;
  ml: boolean;
  total: boolean;
  team_total: boolean;
  way3: boolean;
  dbSportBookId: number;
  ps_point: number;
  ps_juice: number;
  ml_point: number;
  ml_juice: number;
  total_point: number;
  total_juice: number;
  team_total_point: number;
  team_total_juice: number;
  way3_point: number;
  way3_juice: number;
  dbGameId: number;
  dbLeagueId: number;
}

const defaultNHLPeriodItem: IFilterPeriodEntity = {
  id: null,
  type: FilterTypeEnum.LEAGUE,
  lineTypeId: 0,
  dgsLeagueId: 0,
  dgsGameId: 0,
  period: 0,
  enabled: false,
  ps: false,
  ml: false,
  total: false,
  team_total: false,
  way3: false,
  dbSportBookId: 0,
  ps_point: 0,
  ps_juice: 0,
  ml_point: 0,
  ml_juice: 0,
  total_point: 0,
  total_juice: 0,
  team_total_point: 0,
  team_total_juice: 0,
  way3_point: 0,
  way3_juice: 0,
  dbGameId: 0,
  dbLeagueId: 0,
};

export const defaultNHLPeriods: IFilterPeriodEntity[] = [
  defaultNHLPeriodItem,
  { ...defaultNHLPeriodItem, period: 7 },
  { ...defaultNHLPeriodItem, period: 8 },
  { ...defaultNHLPeriodItem, period: 9 },
];
