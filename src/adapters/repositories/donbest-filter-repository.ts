// eslint-disable-next-line import/named
import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import { IDonbestLeagueEntity, IDonbestSportBookEntity, IFilterCombine, FilterTypeEnum } from "@adapters/entity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestFilterRepository {
  fetDefaultFilterCombine(): Promise<IFilterCombine>;
  fetFilterCombine(type: FilterTypeEnum, dgsLeagueId: number, lineTypeId: number): Promise<IFilterCombine>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<boolean>;
}
export class DonbestFilterRepository extends BaseRepository implements IDonbestFilterRepository {
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSaveLeagueFilters(payload)
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

  fetDefaultFilterCombine(): Promise<IFilterCombine> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetCombineFilter(FilterTypeEnum.LEAGUE, 0, 0)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IFilterCombine = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  fetFilterCombine(type: FilterTypeEnum, dgsLeagueId: number, lineTypeId: number): Promise<IFilterCombine> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetCombineFilter(type, dgsLeagueId, lineTypeId)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IFilterCombine = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

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
}
