import { CombineAppActionTypes } from "./app-action";
import { CombineAuthActionTypes } from "./auth-action";

export type CombineActionTypes = CombineAuthActionTypes | CombineAppActionTypes;
export * from "./themes-actions";
export * from "./auth-action";
export * from "./app-action";
