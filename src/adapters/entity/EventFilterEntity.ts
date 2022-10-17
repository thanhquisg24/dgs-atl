import { IDgsLineTypeEntity } from "./DgsLineTypeEntity";
import { IFilterPeriodEntity } from "./FilterPeriodEntity";

export interface IEventFilterEntity {
  eventFilterPeriod: IFilterPeriodEntity[];
  eventLineTypes: IDgsLineTypeEntity[];
}
