import { AxiosResponse } from "axios";
import { AuthApi, IAuthApi } from "./auth-api";
import customAxios from "./customeAxios";

export interface IItemLeagueMapPost {
  dbSportId: number;
  dbLeagueId: number;
  dgsSportId: string;
  dgsLeagueId: number;
}

interface IApiPostType {
  postWagerCancelSuccess(tx_id: string, wager_id: number, wallet_id: string, txFee: number): Promise<AxiosResponse>;
  postSaveLeagueMappings(payload: IItemLeagueMapPost[]): Promise<AxiosResponse>;
  postSaveLeagueMapping(payload: IItemLeagueMapPost): Promise<AxiosResponse>;
  putActiveItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
  putDisabledItemsLeagueMapping(payload: number[]): Promise<AxiosResponse>;
}
interface IApiFetchType {
  fetchActiveDegaGamesHomePage(): Promise<AxiosResponse>;
}

export interface IMainApi extends IApiPostType, IApiFetchType, IAuthApi {}
class MainApi extends AuthApi implements IMainApi {
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

  // Axios: AxiosInstance;

  // constructor(_customAxios: AxiosInstance) {
  //   super(_customAxios);
  //   this.Axios = _customAxios;
  // }

  postWagerCancelSuccess(
    tx_id: string,
    wager_id: number,
    wallet_id: string,
    txFee: number,
  ): Promise<AxiosResponse<any, any>> {
    throw new Error("Method not implemented.");
  }

  fetchActiveDegaGamesHomePage(): Promise<AxiosResponse<any, any>> {
    throw new Error("Method not implemented.");
  }
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
