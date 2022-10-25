import { ILineTypeLinkEntity } from "@adapters/entity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface IDgsLineTypeRepository {
  fetchLineTypeLinks(outIdLineType: number, dgsIdSport: string): Promise<ILineTypeLinkEntity[]>;
}
export class DgsLineTypeRepository extends BaseRepository implements IDgsLineTypeRepository {
  fetchLineTypeLinks(outIdLineType: number, dgsIdSport: string): Promise<ILineTypeLinkEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetchLineTypeLinks(outIdLineType, dgsIdSport)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: ILineTypeLinkEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
