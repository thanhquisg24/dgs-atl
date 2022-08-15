import { IDegaSportEntity } from "@adapters/index";

export interface IDegaSportModel {
  data: { [did: string]: IDegaSportEntity };
  isInitLoaded: boolean;
}
