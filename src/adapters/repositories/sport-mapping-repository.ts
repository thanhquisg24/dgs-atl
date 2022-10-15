// eslint-disable-next-line import/named
import { ISportMapping } from "@adapters/entity/SportMappingEntity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISportMappingRepository {
  // fetAvaiableDgsLeague(): Promise<IDgsLeagueEntity[]>;
  postAddSportMappings(payload: ISportMapping[]): Promise<boolean>;
  // fetchAvaiableDgsLineType(): Promise<IDgsLineTypeEntity[]>;
}
export class SportMappingRepository extends BaseRepository implements ISportMappingRepository {
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
  // fetAvaiableDgsLeague(): Promise<IDgsLeagueEntity[]> {
  //   return new Promise((resolve, reject) => {
  //     this.infra.remote.mainApi
  //       .fetAvaiableDgsLeague()
  //       .then((res: AxiosResponse) => {
  //         if (res.status === 200) {
  //           const { data } = res;
  //           const map: IDgsLeagueEntity[] = data;
  //           resolve(map);
  //         } else {
  //           reject(new Error(`Error HTTP status code ${res.status}`));
  //         }
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }
}