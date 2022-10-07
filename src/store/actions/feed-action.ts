import {
  IDonbestLeagueEntity,
  IDgsLeagueEntity,
  IDgsLineTypeEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
} from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export interface ILeagueFetchDataPayload {
  id: number;
  filterCombine: IFilterCombine | null;
}
export interface IInitConfigFeed {
  listDgsLeague: IDgsLeagueEntity[];
  listDonbestLeague: IDonbestLeagueEntity[];
  listDgsLineType: IDgsLineTypeEntity[];
  listDonbestSportBook: IDonbestSportBookEntity[];
  defaultFilterCombine: IFilterCombine | null;
}

export const selectLeagueId = "feed/SELECT_LEAGUE_ID";
export const selectLeagueIdRequest = createAction<number>("feed/SELECT_LEAGUE_ID_REQUEST");
export const selectLeagueIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_LEAGUE_ID_SUCCESS");
export const selectLeagueIdFailure = createAction<string>("feed/SELECT_LEAGUE_ID_FAILURE");

export const selectGameIdRequest = createAction<number>("feed/SELECT_GAME_ID_REQUEST");
export const selectGameIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_GAME_ID_SUCCESS");
export const selectGameIdFailure = createAction<string>("feed/SELECT_GAME_ID_FAILURE");

export const fetchLeagueInfoTreeRequest = createAction<undefined>("feed/FETCH_LEAGUE_INFO_REQUEST");
export const fetchLeagueInfoTreeSuccess = createAction<IInitConfigFeed>("feed/FETCH_LEAGUE_INFO_SUCCESS");
export const fetchLeagueInfoTreeFailure = createAction<string>("feed/FETCH_LEAGUE_INFO_FAILURE");

export type CombineFeedActionTypes =
  | ReturnType<typeof fetchLeagueInfoTreeRequest>
  | ReturnType<typeof fetchLeagueInfoTreeSuccess>
  | ReturnType<typeof fetchLeagueInfoTreeFailure>
  | ReturnType<typeof selectLeagueIdRequest>
  | ReturnType<typeof selectLeagueIdSuccess>
  | ReturnType<typeof selectLeagueIdFailure>
  | ReturnType<typeof selectGameIdRequest>
  | ReturnType<typeof selectGameIdSuccess>
  | ReturnType<typeof selectGameIdFailure>;
