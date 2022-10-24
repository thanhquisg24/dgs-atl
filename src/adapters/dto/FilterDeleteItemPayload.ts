import { FilterTypeEnum } from "../entity/FilterTypeEnum";

export interface IFilterDeleteItemPayload {
  dgsIdLeague: number;
  type: FilterTypeEnum;
  dgsGameId: number;
  lineTypeId: number;
}
