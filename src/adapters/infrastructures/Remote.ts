import Api, { IMainApi } from "./axios/main-api";

export interface IRemote {
  mainApi: IMainApi;
}

class Remote implements IRemote {
  mainApi: IMainApi;

  constructor() {
    this.mainApi = Api;
  }
}

export default Remote;
