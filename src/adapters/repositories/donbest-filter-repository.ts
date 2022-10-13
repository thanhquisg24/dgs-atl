// eslint-disable-next-line import/named
import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import {
  IDonbestLeagueEntity,
  IDonbestSportBookEntity,
  IFilterCombine,
  FilterTypeEnum,
  convertFilterCombineResult,
  IFilterPeriodEntity,
} from "@adapters/entity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestFilterRepository {
  fetDefaultFilterCombine(): Promise<IFilterCombine>;
  fetFilterCombine(type: FilterTypeEnum, dgsLeagueId: number, lineTypeId: number): Promise<IFilterCombine>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<boolean>;
  postSaveEventFilter(payload: IFilterPeriodEntity): Promise<boolean>;
  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<IFilterPeriodEntity | null>;
}
export class DonbestFilterRepository extends BaseRepository implements IDonbestFilterRepository {
  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<IFilterPeriodEntity | null> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetEventFilter(dgsLeagueId, dgsGameId)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            if (data.length > 0) {
              const item: IFilterPeriodEntity = data[0];
              resolve(item);
            } else {
              resolve(null);
            }
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postSaveEventFilter(payload: IFilterPeriodEntity): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSaveEventFilter(payload)
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
            const map: IFilterCombine = convertFilterCombineResult(data);
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
            const map: IFilterCombine = convertFilterCombineResult(data);
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
