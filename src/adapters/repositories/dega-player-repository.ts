import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface IDegaPlayerRepository {
  // postAirDropDega(walletPubKey: string): Promise<AxiosResponse>;
  // fetchLeaderBoard(): Promise<AxiosResponse>;
  // fetchLeaderBoardAll(): Promise<AxiosResponse>;
}
export class DegaPlayerRepository extends BaseRepository implements IDegaPlayerRepository {
  // fetchLeaderBoard(): Promise<AxiosResponse> {
  //   return this.infra.remote.mainApi.fetchLeaderBoard();
  // }

  // fetchLeaderBoardAll(): Promise<AxiosResponse> {
  //   return this.infra.remote.mainApi.fetchLeaderBoardAll();
  // }

  // postAirDropDega(walletPubKey: string): Promise<AxiosResponse> {
  //   return this.infra.remote.mainApi.postAirDropDega(walletPubKey);
  // }
}
