import { createAction } from "@reduxjs/toolkit";
import { IDegaSportEntity } from "@adapters/index";

export const initSportPage = createAction<undefined>("sport/INIT_SPORT_PAGE");

export const loadDegaSportsAction = createAction<undefined>("sport/LOAD_SPORT");
export const loadDegaSportsRequestAction = createAction<undefined>("sport/LOAD_SPORT_REQUEST");
export const loadDegaSportsSuccesstAction = createAction<IDegaSportEntity[]>("sport/LOAD_SPORT_SUCCESS");
export const loadDegaSportsFailAction = createAction<string>("sport/LOAD_SPORT_FAILURE");

export type CombineDegaSportActionTypes =
  | ReturnType<typeof initSportPage>
  | ReturnType<typeof loadDegaSportsAction>
  | ReturnType<typeof loadDegaSportsRequestAction>
  | ReturnType<typeof loadDegaSportsSuccesstAction>
  | ReturnType<typeof loadDegaSportsFailAction>;
