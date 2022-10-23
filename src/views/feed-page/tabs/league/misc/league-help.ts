import { ILeagueInfoModel } from "@store/models/feed-model";
import { omit } from "lodash";
import { IFromLeagueValue } from "../league-form";

export const buildPayloadLeagueTab = (
  data: IFromLeagueValue,
  leagueInfoTree: {
    [dgsLeagueId: number]: ILeagueInfoModel;
  },
) => {
  const { dgsLeagueId } = data;
  const dbInfo = leagueInfoTree[dgsLeagueId];
  const dbSportId = dbInfo.donbestLeague.dbSport.idSport;
  const filterPeriodReq = data.periodConfig.map((e) => ({
    ...e,
    lineTypeId: data.lineTypeId,
    dgsLeagueId,
    dbLeagueId: dbInfo.donbestLeague.idLeague,
    dbSportId,
  }));
  const filterLineTypeReq = {
    ...omit(data, ["periodConfig"]),
    filterLineTypeId: { lineTypeId: data.lineTypeId, dgsLeagueId },
  };
  filterLineTypeReq.dbLeagueId = dbInfo.donbestLeague.idLeague;
  filterLineTypeReq.dgsLeagueId = dgsLeagueId;
  filterLineTypeReq.dbSportId = dbSportId;
  return { filterLineTypeReq, filterPeriodReq };
};
