// eslint-disable-next-line import/named
import { IFilterDeleteItemPayload } from "@adapters/dto";
import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import { convertFilterCombineResult, FilterTypeEnum, IDonbestLeagueEntity, IDonbestSportBookEntity, IFilterCombine, IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { buildKey, IDonbestEventInfo, IMapDonbestEventInfo } from "@adapters/entity/DonbestEventInfo";
import { IEventFilterEntity } from "@adapters/entity/EventFilterEntity";
import { AxiosResponse } from "axios";
import { differenceWith, isEmpty, isEqual, isNumber, isString, omit } from "lodash";
import { BaseRepository } from "./base-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDonbestFilterRepository {
  fetDonbestIdGames(isCache?: boolean): Promise<IMapDonbestEventInfo>;
  postCopyLeagueFilters(payload: ILeagueFilterPayload[]): Promise<boolean>;
  fetDefaultFilterCombine(): Promise<IFilterCombine>;
  fetFilterCombine(type: FilterTypeEnum, dgsLeagueId: number, lineTypeId: number): Promise<IFilterCombine>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<boolean>;
  postSaveEventFilters(payload: IFilterPeriodEntity[]): Promise<boolean>;
  fetEventFilter(dgsLeagueId: number, dgsGameId: number, lineTypeId?: number): Promise<IEventFilterEntity>;
  postSyncLines(dgsIdLeague: number): Promise<boolean>;
  postSyncOdds(dgsIdGame: number): Promise<boolean>;
  postSyncScores(dgsIdLeague: number): Promise<boolean>;
  postSyncTimes(dgsIdLeague: number): Promise<boolean>;
  postSyncLeagueGame(dgsIdLeague: number): Promise<boolean>;
  postDeleteFilterItem(payload: IFilterDeleteItemPayload): Promise<boolean>;
  compareTwoLeagueFilter(leagueToSave: ILeagueFilterPayload): Promise<boolean>;
  compareTwoEventFilter(eventToSave: IFilterPeriodEntity[], dgsLeagueId: number, dgsGameId: number, lineTypeId: number): Promise<boolean>;
}
const setEmptyOrStr = (v: any) => {
  if (isString(v) && isEmpty(v)) return null;
  if (isNumber(v)) return `${v}`;
  return v;
};
const convert = (data: any) => Object.entries(data).map(([key, value]) => ({ [key]: setEmptyOrStr(value) }));

const transPeriods = (periods: IFilterPeriodEntity[]) => {
  const newPeriods = [...periods];
  for (let index = 0; index < newPeriods.length; index++) {
    const element = newPeriods[index];
    element.id = null;
    element.ps_point = setEmptyOrStr(element.ps_point);
    element.ps_juice = setEmptyOrStr(element.ps_juice);
    element.ml_juice = setEmptyOrStr(element.ml_juice);
    element.total_point = setEmptyOrStr(element.total_point);
    element.total_juice = setEmptyOrStr(element.total_juice);
  }
  return newPeriods;
};

export class DonbestFilterRepository extends BaseRepository implements IDonbestFilterRepository {
  async compareTwoEventFilter(eventToSave: IFilterPeriodEntity[], dgsLeagueId: number, dgsGameId: number, lineTypeId: number): Promise<boolean> {
    const eventFetch = await this.fetEventFilter(dgsLeagueId, dgsGameId, lineTypeId);
    if (eventFetch.eventFilterPeriod.length === 0) {
      return false;
    }
    const leftTocompare = transPeriods(eventToSave);
    const rightTocompare = transPeriods(eventFetch.eventFilterPeriod);
    const changesPeriods = differenceWith(leftTocompare, rightTocompare, isEqual);
    if (changesPeriods.length > 0) {
      return false;
    }
    return true;
  }

  async compareTwoLeagueFilter(leagueToSave: ILeagueFilterPayload): Promise<boolean> {
    const { dgsLeagueId, lineTypeId } = leagueToSave.filterLineTypeReq.filterLineTypeId;
    const getCombineItem = await this.fetFilterCombine(FilterTypeEnum.LEAGUE, dgsLeagueId, lineTypeId);
    if (getCombineItem.listFilterLineType.length === 0) {
      return false;
    }
    //@ts-ignore
    const leftLineType: IFilterLineTypeEntity = omit(leagueToSave.filterLineTypeReq, ["filterLineTypeId", "dbSportsBookId"]);
    const leftLineTypePrepareCompare = convert(leftLineType);
    const rightLineType: IFilterLineTypeEntity[] = getCombineItem.listFilterLineType;
    const rightLineTypeToCompare = convert(rightLineType[0]);
    const changesLineType = differenceWith(leftLineTypePrepareCompare, rightLineTypeToCompare, isEqual);
    if (changesLineType.length > 0) {
      return false;
    }
    const leftPeriods: IFilterPeriodEntity[] = leagueToSave.filterPeriodReq;
    const rightPeriods: IFilterPeriodEntity[] = getCombineItem.listFilterPeriod;
    const changesPeriods = differenceWith(transPeriods(leftPeriods), transPeriods(rightPeriods), isEqual);
    if (changesPeriods.length > 0) {
      return false;
    }
    return true;
  }

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

  fetDonbestIdGames(isCache?: boolean): Promise<IMapDonbestEventInfo> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetDonbestIdGames(isCache)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const list: IDonbestEventInfo[] = data;
            const reduceObj: IMapDonbestEventInfo = list.reduce((obj: IMapDonbestEventInfo, cur) => {
              const k = buildKey(cur);
              if (obj[k]) {
                // eslint-disable-next-line no-param-reassign
                obj[k] = { ...obj[k], [cur.idGame]: cur };
              } else {
                // eslint-disable-next-line no-param-reassign
                obj = {
                  ...obj,
                  [k]: {
                    [cur.idGame]: cur,
                  },
                };
              }
              return obj;
            }, {}); //end reduce
            resolve(reduceObj);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
    // return Promise.resolve([]);
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

  fetEventFilter(dgsLeagueId: number, dgsGameId: number, lineTypeId?: number): Promise<IEventFilterEntity> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetEventFilter(dgsLeagueId, dgsGameId, lineTypeId)
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
