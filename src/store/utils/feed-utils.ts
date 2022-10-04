import { IDgsLeagueEntity } from "@adapters/entity/DgsLeagueEntity";
import { ILeagueInfoModel } from "@store/models/feed-model";

export function buildDgsLeaguesTree(payload: IDgsLeagueEntity[]): { [dgsLeagueId: number]: ILeagueInfoModel } {
  const reduceObj = payload.reduce((obj, cur) => ({ ...obj, [cur.idLeague]: cur }), {});
  return reduceObj;
}
