// eslint-disable-next-line import/named
import { IDonbestLeagueEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { IItemLeagueMapPost } from "@adapters/infrastructures/axios/main-api";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestLeagueRepository {
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse>;
  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse>;
  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  fetAvaiableDonbestLeague(): Promise<IDonbestLeagueEntity[]>;
  fetAvaiableDonbestSportBook(): Promise<IDonbestSportBookEntity[]>;
}
export class DonbestLeagueRepository extends BaseRepository implements IDonbestLeagueRepository {
  fetAvaiableDonbestSportBook(): Promise<IDonbestSportBookEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAvaiableDonbestSportBook()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IDonbestSportBookEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  fetAvaiableDonbestLeague(): Promise<IDonbestLeagueEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAvaiableDonbestLeague()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IDonbestLeagueEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse<any, any>> {
    return this.infra.remote.mainApi.putActiveItemsLeagueMapping(payload);
  }

  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse<any, any>> {
    return this.infra.remote.mainApi.putDisabledItemsLeagueMapping(payload);
  }

  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse<any, any>> {
    return this.infra.remote.mainApi.postSaveLeagueMappings(payload);
  }

  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse<any, any>> {
    return this.infra.remote.mainApi.postSaveLeagueMapping(payload);
  }
}
