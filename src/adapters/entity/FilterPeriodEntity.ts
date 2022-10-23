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

  dbSportBookId: number;
  ps_point: number | null | string;
  ps_juice: number | null | string;
  ml_point: number | null | string;
  ml_juice: number | null | string;
  total_point: number | null | string;
  total_juice: number | null | string;

  dbGameId: number;
  dbLeagueId: number;
  dbSportId: number;
}

const defaultNHLPeriodItem: IFilterPeriodEntity = {
  id: null,
  type: FilterTypeEnum.LEAGUE,
  lineTypeId: 0,
  dgsLeagueId: 0,
  dgsGameId: 0,
  period: 0,
  enabled: true,
  ps: true,
  ml: true,
  total: true,
  dbSportBookId: 0,
  ps_point: "",
  ps_juice: "",
  ml_point: "",
  ml_juice: "",
  total_point: "",
  total_juice: "",
  dbGameId: 0,
  dbLeagueId: 0,
  dbSportId: 0,
};

export const defaultNHLPeriods: IFilterPeriodEntity[] = [
  defaultNHLPeriodItem,
  { ...defaultNHLPeriodItem, period: 7 },
  { ...defaultNHLPeriodItem, period: 8 },
  { ...defaultNHLPeriodItem, period: 9 },
];
