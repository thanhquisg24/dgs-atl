import { IDgsLeagueEntity } from "@adapters/entity/DgsLeagueEntity";
import { createAction } from "@reduxjs/toolkit";

export interface ILeagueFetchDataPayload {
  id: number;
}

export const selectLeagueId = "feed/SELECT_LEAGUE_ID";
export const selectLeagueIdRequest = createAction<number>("feed/SELECT_LEAGUE_ID_REQUEST");
export const selectLeagueIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_LEAGUE_ID_SUCCESS");
export const selectLeagueIdFailure = createAction<string>("feed/SELECT_LEAGUE_ID_FAILURE");

export const selectGameIdRequest = createAction<number>("feed/SELECT_GAME_ID_REQUEST");
export const selectGameIdSuccess = createAction<ILeagueFetchDataPayload>("feed/SELECT_GAME_ID_SUCCESS");
export const selectGameIdFailure = createAction<string>("feed/SELECT_GAME_ID_FAILURE");

export const fetchDgsLeaguesRequest = createAction<undefined>("feed/FETCH_DGSLEAGUES_REQUEST");
export const fetchDgsLeaguesSuccess = createAction<IDgsLeagueEntity[]>("feed/FETCH_DGSLEAGUES_SUCCESS");
export const fetchDgsLeaguesFailure = createAction<string>("feed/FETCH_DGSLEAGUES_FAILURE");

export type CombineFeedActionTypes =
  | ReturnType<typeof fetchDgsLeaguesRequest>
  | ReturnType<typeof fetchDgsLeaguesSuccess>
  | ReturnType<typeof fetchDgsLeaguesFailure>
  | ReturnType<typeof selectLeagueIdRequest>
  | ReturnType<typeof selectLeagueIdSuccess>
  | ReturnType<typeof selectLeagueIdFailure>
  | ReturnType<typeof selectGameIdRequest>
  | ReturnType<typeof selectGameIdSuccess>
  | ReturnType<typeof selectGameIdFailure>;
