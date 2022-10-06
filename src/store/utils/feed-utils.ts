import { IDgsLeagueEntity, IDonbestLeagueEntity } from "@adapters/entity";
import { ILeagueInfoModel } from "@store/models/feed-model";

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
