import { FilterTypeEnum } from "./FilterTypeEnum";

export interface IFilterLineTypeEntity {
  id: number | null;
  type: FilterTypeEnum;
  lineTypeId: number;
  dgsLeagueId: number;
  dgsGameId: number;
  dbSportsBookId: number;
  enabled: boolean;
  autoScore: boolean;
  autoTimeChange: boolean;
  useOddsBySports: boolean;
  useDGSLinkedLineTypes: boolean;
  preserveFavoriteJuice: boolean;
  followParentExcept: boolean;
  dbLeagueId: number | null;
}
