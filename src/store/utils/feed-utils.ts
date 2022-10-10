import {
  IDgsLeagueEntity,
  IDonbestLeagueEntity,
  IFilterCombine,
  IFilterLineTypeEntity,
  IFilterPeriodEntity,
} from "@adapters/entity";
import {
  ILeagueInfoModel,
  IMapFilterCombine,
  IMapFilterLineTypeConfig,
  IMapFilterPeriodConfig,
} from "@store/models/feed-model";
import { get } from "lodash";

export function buildDgsLeaguesTree(
  dgs: IDgsLeagueEntity[],
  donbest: IDonbestLeagueEntity[],
): { [dgsLeagueId: number]: ILeagueInfoModel } {
  const reduceObj: { [dgsLeagueId: number]: ILeagueInfoModel } = dgs.reduce(
    (obj, cur) => ({ ...obj, [cur.idLeague]: { dgsLeague: cur, donbestLeague: null, dgsGames: [] } }),
    {},
  );
  for (let index = 0; index < donbest.length; index++) {
    const don = donbest[index];
    reduceObj[don.dgsIdLeague].donbestLeague = don;
  }
  return reduceObj;
}

export function buildKeyLineTypeAndSportbook(lineTypeId: number, sportbookId: number): string {
  return `${lineTypeId}_${sportbookId}`;
}

export function buildMapFilterLineType(data: IFilterLineTypeEntity[] | undefined): IMapFilterLineTypeConfig | null {
  if (data) {
    const reduceObj: IMapFilterLineTypeConfig = data.reduce(
      (obj, cur) => ({
        ...obj,
        [buildKeyLineTypeAndSportbook(cur.lineTypeId, cur.dbSportsBookId)]: cur,
        [cur.lineTypeId]: cur,
      }),
      {},
    ); //end reduce
    return reduceObj;
  }
  return null;
}

export function buildMapFilterPeriod(data: IFilterPeriodEntity[] | undefined): IMapFilterPeriodConfig | null {
  if (data) {
    let result: IMapFilterPeriodConfig = {};
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let list = get(result, element.lineTypeId);
      if (list === null || list === undefined) {
        list = [];
      }
      list.push(element);
      result = { ...result, [element.lineTypeId]: list };
    }
    return result;
  }
  return null;
}
