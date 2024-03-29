import { IFilterDeleteItemPayload } from "@adapters/dto/FilterDeleteItemPayload";
import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import { ISystemSettingPayload } from "@adapters/dto/SystemSettingPayload";
import { IFilterPeriodEntity } from "@adapters/entity";
import { ISportMapping } from "@adapters/entity/SportMappingEntity";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { AuthApi, IAuthApi } from "./auth-api";
import customAxios from "./customeAxios";

export interface IItemLeagueMapPost {
  dbSportId: number;
  dbLeagueId: number;
  dgsSportId: string;
  dgsLeagueId: number;
}

interface IApiPostType {
  postCopyLeagueFilters(payload: ILeagueFilterPayload[]): Promise<AxiosResponse>;
  postDeleteSportMappingItems(items: number[]): Promise<AxiosResponse>;
  postAddSportMappings(payload: ISportMapping[]): Promise<AxiosResponse>;
  postUpdateSportMapping(payload: ISportMapping): Promise<AxiosResponse>;
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse>;
  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse>;
  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<AxiosResponse>;
  postSaveEventFilters(payload: IFilterPeriodEntity[]): Promise<AxiosResponse>;
  postSyncLines(dgsIdLeague: number): Promise<AxiosResponse>;
  postSyncLeagueGame(dgsIdLeague: number): Promise<AxiosResponse>;
  postSyncScores(dgsIdLeague: number): Promise<AxiosResponse>;
  postSyncTimes(dgsIdLeague: number): Promise<AxiosResponse>;
  postSyncOdds(dgsIdGame: number): Promise<AxiosResponse>;
  postDeleteFilterItem(payload: IFilterDeleteItemPayload): Promise<AxiosResponse>;
  deleteItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
}
interface IApiFetchType {
  fetDonbestIdGames(isCache?: boolean): Promise<AxiosResponse>;
  fetchAvaiableDgsLineType(): Promise<AxiosResponse>;
  fetAvaiableDgsLeague(): Promise<AxiosResponse>;
  fetAvaiableDgsGames(idLeague: number): Promise<AxiosResponse>;
  fetAllDonbestSportMapping(): Promise<AxiosResponse>;
  fetAvaiableDonbestLeague(): Promise<AxiosResponse>;
  fetAvaiableDonbestSportBook(): Promise<AxiosResponse>;

  fetCombineFilter(type: string, dgsLeagueId: number, lineTypeId: number): Promise<AxiosResponse>;
  fetEventFilter(dgsLeagueId: number, dgsGameId: number, lineTypeId?: number): Promise<AxiosResponse>;

  fetFeedLeagues(): Promise<AxiosResponse>;
  fetchLineTypeLinks(outIdLineType: number, dgsIdSport: string): Promise<AxiosResponse>;
}
interface IApiSystemSetting {
  fetNewToken(): Promise<AxiosResponse>;
  fetSystemStatus(): Promise<AxiosResponse>;
  fetAllSystemSettings(): Promise<AxiosResponse>;
  postUpdateSystemSetting(setting: ISystemSettingPayload): Promise<AxiosResponse>;
}

export interface IMainApi extends IApiPostType, IApiFetchType, IAuthApi, IApiSystemSetting {}

class MainApi extends AuthApi implements IMainApi {
  deleteItemsLeagueMapping(payload: number[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("db-league/delete-items", payload);
  }

  fetNewToken(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("system-setting/get-new-db-token");
  }

  fetSystemStatus(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("system-setting/get-system-status");
  }

  fetAllSystemSettings(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("system-setting/get-all-setting");
  }

  postUpdateSystemSetting(setting: ISystemSettingPayload): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/system-setting/update-setting", setting);
  }

  fetDonbestIdGames(isCache?: boolean): Promise<AxiosResponse<any, any>> {
    const pathReq = "db-filter/get-db-id-games";
    if (isCache) {
      return this.Axios.get(pathReq, {
        cache: {
          maxAge: 3 * 60 * 1000, // 2 min instead of 15 min
          exclude: { query: false },
        },
      });
    }
    return this.Axios.get(pathReq);
  }

  fetchLineTypeLinks(outIdLineType: number, dgsIdSport: string): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("dgs-linetype/get-linetype-links", {
      params: {
        outIdLineType,
        dgsIdSport,
      },
    });
  }

  postCopyLeagueFilters(payload: ILeagueFilterPayload[]): Promise<AxiosResponse> {
    return this.Axios.post("/db-filter/copy-filter-league", payload);
  }

  postDeleteFilterItem(payload: IFilterDeleteItemPayload): Promise<AxiosResponse> {
    return this.Axios.post("/db-filter/delete-filter", payload);
  }

  fetAllDonbestSportMapping(): Promise<AxiosResponse> {
    return this.Axios.get("sport-mapping/all-mapping");
  }

  postSyncLeagueGame(dgsIdLeague: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdLeague,
    });
    return this.Axios.post("/db-filter/sync-league-game", xFromData);
  }

  fetFeedLeagues(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-league/get-feed-league");
  }

  postUpdateSportMapping(payload: ISportMapping): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/sport-mapping/update-item", payload);
  }

  postDeleteSportMappingItems(items: number[]): Promise<AxiosResponse> {
    return this.Axios.post("/sport-mapping/delete-items", items);
  }

  postAddSportMappings(payload: ISportMapping[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/sport-mapping/add-items", payload);
  }

  postSyncLines(dgsIdLeague: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdLeague,
    });
    return this.Axios.post("/db-filter/sync-league", xFromData);
  }

  postSyncOdds(dgsIdGame: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdGame,
    });
    return this.Axios.post("/db-filter/sync-game", xFromData);
  }

  postSyncScores(dgsIdLeague: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdLeague,
    });
    return this.Axios.post("/db-filter/sync-scores", xFromData);
  }

  postSyncTimes(dgsIdLeague: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdLeague,
    });
    return this.Axios.post("/db-filter/sync-times", xFromData);
  }

  fetEventFilter(dgsLeagueId: number, dgsGameId: number, lineTypeId?: number): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-filter/get-event-filter", {
      params: {
        dgsLeagueId,
        dgsGameId,
        lineTypeId,
      },
    });
  }

  postSaveEventFilters(payload: IFilterPeriodEntity[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/db-filter/save-filter-event", payload);
  }

  fetAvaiableDgsGames(idLeague: number): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("dgs-game/get-avaiable-games", {
      params: {
        dgsLeagueId: Number(idLeague),
      },
    });
  }

  fetCombineFilter(type: string, dgsLeagueId: number, lineTypeId: number): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-filter/get-combine-filter", {
      params: {
        type,
        dgsLeagueId,
        lineTypeId,
      },
    });
  }

  fetAvaiableDonbestSportBook(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-sportbook/get-avaiable-sportbook");
  }

  fetAvaiableDonbestLeague(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-league/get-avaiable-league");
  }

  fetchAvaiableDgsLineType(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("dgs-linetype/get-avaiable-linetype");
  }

  fetAvaiableDgsLeague(): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("dgs-league/get-avaiable-list");
  }

  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.put("/db-league/active", payload);
  }

  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.put("/db-league/disabled", payload);
  }

  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/db-league/update-items", payload);
  }

  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/db-league/update-item", payload);
  }

  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/db-filter/save-filter-league", payload);
  }
  // Axios: AxiosInstance;

  // constructor(_customAxios: AxiosInstance) {
  //   super(_customAxios);
  //   this.Axios = _customAxios;
  // }
}

// mockAxios(customAxios);
const SingletonApi = (() => {
  let instance: IMainApi;
  function createInstance() {
    return new MainApi(customAxios);
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
const Api = SingletonApi.getInstance();
export default Api;
