import { IDgsGameEntity, IDgsGameEntityWithLeague, IDgsLeagueEntity, IDgsLineTypeEntity, IDonbestLeagueEntity, IDonbestSportBookEntity, IFilterCombine, IFilterPeriodEntity } from "@adapters/entity";
import { IMapDonbestEventInfo } from "@adapters/entity/DonbestEventInfo";
import { createAction } from "@reduxjs/toolkit";
import { CurrentTabType } from "@store/models/feed-model";

export interface ILeagueFetchDataPayload {
  id: number;
  dgsSportId: string | null;
  defaultSelectedLineType: string | null | number;
  filterCombine: IFilterCombine | null;
  clearSelectedGame?: boolean;
}
export interface IInitConfigFeed {
  listDgsLeague: IDgsLeagueEntity[];
  listDonbestLeague: IDonbestLeagueEntity[];
  listDgsLineType: IDgsLineTypeEntity[];
  listDonbestSportBook: IDonbestSportBookEntity[];
  dbIdGames: IMapDonbestEventInfo;
  defaultFilterCombine: IFilterCombine | null;
}
interface IFetchDgsGameSuccessPayload {
  dgsLeagueId: number;
  dbLeagueId: number;
  dbSportId: number;
  list: IDgsGameEntity[];
}
interface IFetchEventPeriodSuccess {
  eventFilterPeriodConfig: IFilterPeriodEntity[];
  gameWithLeague: IDgsGameEntityWithLeague | null;
  defaultSelectedLineType: string | null | number;
  eventLineTypes: IDgsLineTypeEntity[];
}
export const selectLeagueId = "feed/SELECT_LEAGUE_ID";
export const selectLeagueIdRequest = createAction<{ dgsLeagueId: number }>("feed/SELECT_LEAGUE_ID_REQUEST");
export const selectLeagueIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_LEAGUE_ID_SUCCESS");
export const selectLeagueIdNotChanged = createAction<undefined>("feed/SELECT_LEAGUE_ID_NOT_SELECT_LEAGUE_ID_NOTCHANGE");
export const selectLeagueIdFailure = createAction<string>("feed/SELECT_LEAGUE_ID_FAILURE");
export const selectLeagueIdRefresh = createAction<{
  dgsLeagueId: number;
  defaultSelectedLineType: string | number | null;
  clearSelectedGame?: boolean;
}>("feed/SELECT_LEAGUE_ID_REFRESH");

export const selectEventFilterdRequest = createAction<IDgsGameEntityWithLeague>("feed/SELECT_GAME_ID_REQUEST");
export const selectEventFilterSuccess = createAction<IFetchEventPeriodSuccess>("feed/SELECT_GAME_ID_SUCCESS");
export const selectEventFilterFailure = createAction<string>("feed/SELECT_GAME_ID_FAILURE");
export const selectEventFilterdReFresh = createAction<{
  gameWithLeague: IDgsGameEntityWithLeague;
  defaultSelectedLineType: string | null | number;
}>("feed/SELECT_GAME_ID_REFESH");

export const fetchLeagueInfoTreeRequest = createAction<undefined>("feed/FETCH_LEAGUE_INFO_REQUEST");
export const fetchLeagueInfoTreeSuccess = createAction<IInitConfigFeed>("feed/FETCH_LEAGUE_INFO_SUCCESS");
export const fetchLeagueInfoTreeFailure = createAction<string>("feed/FETCH_LEAGUE_INFO_FAILURE");

export const expandLeagueRequest = createAction<number>("feed/EXPAND_LEAGUE_REQUEST");
export const expandLeagueSuccess = createAction<IFetchDgsGameSuccessPayload>("feed/EXPAND_LEAGUE_SUCCESS");
export const expandLeagueFailure = createAction<string>("feed/EXPAND_LEAGUE_FAILURE");

export const switchTabAction = createAction<CurrentTabType>("feed/SWITCH_TAB_ACTION");
export const rereshDataAction = createAction<undefined>("feed/REFRESH_DATA_ACTION");

export type CombineFeedActionTypes =
  | ReturnType<typeof rereshDataAction>
  | ReturnType<typeof fetchLeagueInfoTreeRequest>
  | ReturnType<typeof fetchLeagueInfoTreeSuccess>
  | ReturnType<typeof fetchLeagueInfoTreeFailure>
  | ReturnType<typeof selectLeagueIdRequest>
  | ReturnType<typeof selectLeagueIdSuccess>
  | ReturnType<typeof selectLeagueIdFailure>
  | ReturnType<typeof selectLeagueIdNotChanged>
  | ReturnType<typeof selectLeagueIdRefresh>
  | ReturnType<typeof selectEventFilterdRequest>
  | ReturnType<typeof selectEventFilterSuccess>
  | ReturnType<typeof selectEventFilterFailure>
  | ReturnType<typeof selectEventFilterdReFresh>
  | ReturnType<typeof expandLeagueRequest>
  | ReturnType<typeof expandLeagueSuccess>
  | ReturnType<typeof expandLeagueFailure>
  | ReturnType<typeof switchTabAction>;
