import { omit } from "lodash";
import { IFilterLineTypeEntity } from "./FilterLineTypeEntity";
import { IFilterPeriodEntity } from "./FilterPeriodEntity";

export interface IFilterCombine {
  listFilterLineType: IFilterLineTypeEntity[];
  listFilterPeriod: IFilterPeriodEntity[];
}

export const convertFilterLineType = (source: any): IFilterLineTypeEntity => {
  const filterLineTypeId = { ...source.filterLineTypeId };
  return { ...omit(source, ["filterLineTypeId"]), ...filterLineTypeId };
};
export const convertFilterLineTypeArr = (sourceArr: any): IFilterLineTypeEntity[] => {
  const arrImmutableVersion = sourceArr.map((e: any) => convertFilterLineType(e));
  return arrImmutableVersion;
};

export const convertFilterCombineResult = (source: any): IFilterCombine => {
  const listFilterLineType = convertFilterLineTypeArr(source.listFilterLineType);
  return { listFilterLineType, listFilterPeriod: source.listFilterPeriod };
};
