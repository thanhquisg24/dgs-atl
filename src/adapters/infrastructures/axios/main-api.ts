import { ILeagueFilterPayload } from "@adapters/dto/LeagueFilterPayload";
import { IFilterPeriodEntity } from "@adapters/entity";
import axios, { AxiosResponse } from "axios";
import { AuthApi, IAuthApi } from "./auth-api";
import queryString from "query-string";
import customAxios from "./customeAxios";
import { ISportMapping } from "@adapters/entity/SportMappingEntity";

export interface IItemLeagueMapPost {
  dbSportId: number;
  dbLeagueId: number;
  dgsSportId: string;
  dgsLeagueId: number;
}

interface IApiPostType {
  postAddSportMappings(payload: ISportMapping[]): Promise<AxiosResponse>;
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse>;
  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse>;
  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  postSaveLeagueFilters(payload: ILeagueFilterPayload): Promise<AxiosResponse>;
  postSaveEventFilter(payload: IFilterPeriodEntity): Promise<AxiosResponse>;
  postSyncLines(dgsIdLeague: number): Promise<AxiosResponse>;
  postSyncOdds(dgsIdGame: number): Promise<AxiosResponse>;
}
interface IApiFetchType {
  fetchAvaiableDgsLineType(): Promise<AxiosResponse>;
  fetAvaiableDgsLeague(): Promise<AxiosResponse>;
  fetAvaiableDgsGames(idLeague: number): Promise<AxiosResponse>;
  fetAvaiableDonbestLeague(): Promise<AxiosResponse>;
  fetAvaiableDonbestSportBook(): Promise<AxiosResponse>;

  fetCombineFilter(type: string, dgsLeagueId: number, lineTypeId: number): Promise<AxiosResponse>;
  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<AxiosResponse>;
}

export interface IMainApi extends IApiPostType, IApiFetchType, IAuthApi {}
class MainApi extends AuthApi implements IMainApi {
  postAddSportMappings(payload: ISportMapping[]): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/sport-mapping/add-items", payload);
  }

  postSyncLines(dgsIdLeague: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdLeague,
    });
    return axios.post("/dgs/line/sync-league", xFromData);
  }

  postSyncOdds(dgsIdGame: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      dgsIdGame,
    });
    return axios.post("/dgs/line/sync-game", xFromData);
  }

  fetEventFilter(dgsLeagueId: number, dgsGameId: number): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("db-filter/get-event-filter", {
      params: {
        dgsLeagueId,
        dgsGameId,
      },
    });
  }

  postSaveEventFilter(payload: IFilterPeriodEntity): Promise<AxiosResponse<any, any>> {
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
