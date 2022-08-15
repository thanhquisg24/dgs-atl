import { IDegaSportModel } from "../models/dega-sport-model";
import { RootStateType } from "../types";

export const getDegaSportSelector = (state: RootStateType): IDegaSportModel => state.sport;
