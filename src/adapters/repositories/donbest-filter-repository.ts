// eslint-disable-next-line import/named
import { IFilterDeleteItemPayload } from "@adapters/dto";
import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import { convertFilterCombineResult, FilterTypeEnum, IDonbestLeagueEntity, IDonbestSportBookEntity, IFilterCombine, IFilterPeriodEntity } from "@adapters/entity";
import { IEventFilterEntity } from "@adapters/entity/EventFilterEntity";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestFilterRepository {
  fetDonbestIdGames(): Promise<number[]>;
  postCopyLeagueFilters(payload: ILeagueFilterPayload[]): Promise<boolean>;
  fetDefaultFilterCombine(): Promise<IFilterCombine>;
  fetFilterCombine(type: FilterTypeEnum, dgsLeagueId: number, lineTypeId: number): Promise<IFilterCombine>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<boolean>;
  postSaveEventFilters(payload: IFilterPeriodEntity[]): Promise<boolean>;
  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<IEventFilterEntity>;
  postSyncLines(dgsIdLeague: number): Promise<boolean>;
  postSyncOdds(dgsIdGame: number): Promise<boolean>;
  postSyncScores(dgsIdLeague: number): Promise<boolean>;
  postSyncTimes(dgsIdLeague: number): Promise<boolean>;
  postSyncLeagueGame(dgsIdLeague: number): Promise<boolean>;
  postDeleteFilterItem(payload: IFilterDeleteItemPayload): Promise<boolean>;
}
export class DonbestFilterRepository extends BaseRepository implements IDonbestFilterRepository {
  postSyncScores(dgsIdLeague: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSyncScores(dgsIdLeague)
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

  postSyncTimes(dgsIdLeague: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSyncTimes(dgsIdLeague)
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

  fetDonbestIdGames(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetDonbestIdGames()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: number[] = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postCopyLeagueFilters(payload: ILeagueFilterPayload[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postCopyLeagueFilters(payload)
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

  postDeleteFilterItem(payload: IFilterDeleteItemPayload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postDeleteFilterItem(payload)
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

  postSyncLeagueGame(dgsIdLeague: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSyncLeagueGame(dgsIdLeague)
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

  postSyncLines(dgsIdLeague: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSyncLines(dgsIdLeague)
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

  postSyncOdds(dgsIdGame: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSyncOdds(dgsIdGame)
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

  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<IEventFilterEntity> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetEventFilter(dgsLeagueId, dgsGameId)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: IEventFilterEntity = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postSaveEventFilters(payload: IFilterPeriodEntity[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postSaveEventFilters(payload)
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
