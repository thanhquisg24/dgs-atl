// eslint-disable-next-line import/named
import { ISportMapping } from "@adapters/entity/SportMappingEntity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface ISportMappingRepository {
  postDeleteItems(items: number[]): Promise<boolean>;
  postAddSportMappings(payload: ISportMapping[]): Promise<boolean>;
  postUpdateSportMapping(payload: ISportMapping): Promise<boolean>;
  fetAllDonbestSportMapping(): Promise<ISportMapping[]>;
}
export class SportMappingRepository extends BaseRepository implements ISportMappingRepository {
  fetAllDonbestSportMapping(): Promise<ISportMapping[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAllDonbestSportMapping()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: ISportMapping[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postUpdateSportMapping(payload: ISportMapping): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postUpdateSportMapping(payload)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            resolve(true);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postDeleteItems(items: number[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postDeleteSportMappingItems(items)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            resolve(true);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postAddSportMappings(payload: ISportMapping[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postAddSportMappings(payload)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            resolve(true);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
