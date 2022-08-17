import { IAuthModel } from "@store/models/auth-model";
import { RootStateType } from "../types";

export const getAuthSelector = (state: RootStateType): IAuthModel => state.auth;
