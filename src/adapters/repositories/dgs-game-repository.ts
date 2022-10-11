// eslint-disable-next-line import/named
import { IDgsGameEntity } from "@adapters/entity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDGSGameRepository {
  fetAvaiableDgsGames(idLeague: number): Promise<IDgsGameEntity[]>;
}
export class DGSGameRepository extends BaseRepository implements IDGSGameRepository {
  fetAvaiableDgsGames(idLeague: number): Promise<IDgsGameEntity[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAvaiableDgsGames(idLeague)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IDgsGameEntity[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
