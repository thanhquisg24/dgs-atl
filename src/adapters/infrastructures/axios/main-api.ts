import { AxiosResponse } from "axios";
import { AuthApi } from "./auth-api";
import customAxios from "./customeAxios";

interface IApiPostType {
  postWagerCancelSuccess(tx_id: string, wager_id: number, wallet_id: string, txFee: number): Promise<AxiosResponse>;
}
interface IApiFetchType {
  fetchActiveDegaGamesHomePage(): Promise<AxiosResponse>;
}

export interface IMainApi extends IApiPostType, IApiFetchType {}
class MainApi extends AuthApi implements IMainApi {
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
