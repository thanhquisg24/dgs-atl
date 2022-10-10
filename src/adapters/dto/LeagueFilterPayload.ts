import { IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";

export interface ILeagueFilterPayload {
  filterLineTypeReq: IFilterLineTypeEntity;
  filterPeriodReq: IFilterPeriodEntity[];
}
