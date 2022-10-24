import { IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";

interface IFilterLineTypeEntityWithID extends IFilterLineTypeEntity {
  filterLineTypeId: {
    lineTypeId: number;
    dgsLeagueId: number;
  };
}
export interface ILeagueFilterPayload {
  filterLineTypeReq: IFilterLineTypeEntityWithID;
  filterPeriodReq: IFilterPeriodEntity[];
}