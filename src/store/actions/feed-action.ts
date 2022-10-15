import {
  IDonbestLeagueEntity,
  IDgsLeagueEntity,
  IDgsLineTypeEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
  IDgsGameEntityWithLeague,
  IDgsGameEntity,
} from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";
import { ISelectedGame } from "@store/models/feed-model";

export interface ILeagueFetchDataPayload {
  id: number;
  dgsSportId: string | null;
  defaultSelectedLineType: string | null;
  filterCombine: IFilterCombine | null;
}
export interface IInitConfigFeed {
  listDgsLeague: IDgsLeagueEntity[];
  listDonbestLeague: IDonbestLeagueEntity[];
  listDgsLineType: IDgsLineTypeEntity[];
  listDonbestSportBook: IDonbestSportBookEntity[];
  defaultFilterCombine: IFilterCombine | null;
}
interface IFetchDgsGameSuccessPayload {
  dgsLeagueId: number;
  dbLeagueId: number;
  list: IDgsGameEntity[];
}
export const selectLeagueId = "feed/SELECT_LEAGUE_ID";
export const selectLeagueIdRequest = createAction<{ dgsLeagueId: number; dgsSportId: string | null }>(
  "feed/SELECT_LEAGUE_ID_REQUEST",
);
export const selectLeagueIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_LEAGUE_ID_SUCCESS");
export const selectLeagueIdNotChanged = createAction<undefined>("feed/SELECT_LEAGUE_ID_NOT_SELECT_LEAGUE_ID_NOTCHANGE");
export const selectLeagueIdFailure = createAction<string>("feed/SELECT_LEAGUE_ID_FAILURE");
export const selectLeagueIdRefresh = createAction<{
  dgsLeagueId: number;
  dgsSportId: string | null;
  defaultSelectedLineType: string | null;
}>("feed/SELECT_LEAGUE_ID_REFRESH");

export const selectEventFilterdRequest = createAction<IDgsGameEntityWithLeague>("feed/SELECT_GAME_ID_REQUEST");
export const selectEventFilterSuccess = createAction<ISelectedGame>("feed/SELECT_GAME_ID_SUCCESS");
export const selectEventFilterFailure = createAction<string>("feed/SELECT_GAME_ID_FAILURE");
export const selectEventFilterdReFresh = createAction<{
  gameWithLeague: IDgsGameEntityWithLeague;
  defaultSelectedLineType: string | null;
}>("feed/SELECT_GAME_ID_REFESH");

export const fetchLeagueInfoTreeRequest = createAction<undefined>("feed/FETCH_LEAGUE_INFO_REQUEST");
export const fetchLeagueInfoTreeSuccess = createAction<IInitConfigFeed>("feed/FETCH_LEAGUE_INFO_SUCCESS");
export const fetchLeagueInfoTreeFailure = createAction<string>("feed/FETCH_LEAGUE_INFO_FAILURE");

export const expandLeagueRequest = createAction<number>("feed/EXPAND_LEAGUE_REQUEST");
export const expandLeagueSuccess = createAction<IFetchDgsGameSuccessPayload>("feed/EXPAND_LEAGUE_SUCCESS");
export const expandLeagueFailure = createAction<string>("feed/EXPAND_LEAGUE_FAILURE");

export type CombineFeedActionTypes =
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
  | ReturnType<typeof expandLeagueFailure>;
