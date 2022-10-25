import { ILeagueFilterPayload } from "@adapters/dto";
import { ILeagueInfoModel } from "@store/models/feed-model";
import { omit } from "lodash";
import { IFromLeagueValue } from "../league-form";

export const buildPayloadLeagueTab = (
  data: IFromLeagueValue,
  leagueInfoTree: {
    [dgsLeagueId: number]: ILeagueInfoModel;
  },
): ILeagueFilterPayload => {
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

export const buildPayloadCopyToLeague = (
  data: IFromLeagueValue,
  leagueInfoSelection: {
    [dgsLeagueId: number]: ILeagueInfoModel;
  },
): ILeagueFilterPayload[] => {
  const { lineTypeId } = data;
  const result: ILeagueFilterPayload[] = [];
  const arr: ILeagueInfoModel[] = Object.values(leagueInfoSelection);
  for (let index = 0; index < arr.length; index++) {
    const dbInfo = arr[index];
    const dgsLeagueId = dbInfo.donbestLeague.dgsIdLeague;
    const dbSportId = dbInfo.donbestLeague.dbSport.idSport;
    const dbLeagueId = dbInfo.donbestLeague.idLeague;
    const filterPeriodReq = data.periodConfig.map((e) => ({
      ...e,
      lineTypeId,
      dgsLeagueId,
      dbLeagueId,
      dbSportId,
    }));
    const filterLineTypeReq = {
      ...omit(data, ["periodConfig"]),
      filterLineTypeId: { lineTypeId, dgsLeagueId },
    };
    filterLineTypeReq.dbLeagueId = dbLeagueId;
    filterLineTypeReq.dgsLeagueId = dgsLeagueId;
    filterLineTypeReq.dbSportId = dbSportId;
    result.push({ filterLineTypeReq, filterPeriodReq });
  }
  return result;
};
