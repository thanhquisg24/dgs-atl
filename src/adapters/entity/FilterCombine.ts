import { IFilterLineTypeEntity } from "./FilterLineTypeEntity";
import { IFilterPeriodEntity } from "./FilterPeriodEntity";

export interface IFilterCombine {
  listFilterLineType: IFilterLineTypeEntity[];
  listFilterPeriod: IFilterPeriodEntity[];
}
