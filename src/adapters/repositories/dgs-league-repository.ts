// eslint-disable-next-line import/named
import { IDgsLeagueEntity } from "@adapters/entity/DgsLeagueEntity";
import { IDgsLineTypeEntity } from "@adapters/entity/DgsLineTypeEntity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDGSLeagueRepository {
  fetAvaiableDgsLeague(): Promise<IDgsLeagueEntity[]>;
  fetchAvaiableDgsLineType(): Promise<IDgsLineTypeEntity[]>;
}
export class DGSLeagueRepository extends BaseRepository implements IDGSLeagueRepository {
  fetchAvaiableDgsLineType(): Promise<IDgsLineTypeEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetchAvaiableDgsLineType()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IDgsLineTypeEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  fetAvaiableDgsLeague(): Promise<IDgsLeagueEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAvaiableDgsLeague()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IDgsLeagueEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
