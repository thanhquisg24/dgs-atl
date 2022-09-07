import { CombineAppActionTypes } from "./app-action";
import { CombineAuthActionTypes } from "./auth-action";
import { CombineFeedActionTypes } from "./feed-action";

export type CombineActionTypes = CombineAuthActionTypes | CombineAppActionTypes | CombineFeedActionTypes;
export * from "./themes-actions";
export * from "./auth-action";
export * from "./app-action";
export * from "./feed-action";
