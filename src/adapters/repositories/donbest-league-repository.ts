// eslint-disable-next-line import/named
import { IItemLeagueMapPost } from "@adapters/infrastructures/axios/main-api";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestLeagueRepository {
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse>;
}
export class DonbestLeagueRepository extends BaseRepository implements IDonbestLeagueRepository {
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse<any, any>> {
    return this.infra.remote.mainApi.postSaveLeagueMappings(payload);
  }
}
