import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface IAuthRepository {
  postLogin(username: string, password: string): Promise<AxiosResponse>;
  postLogout(userId: number): Promise<AxiosResponse>;
  postRefreshToken(refreshToken: string): Promise<AxiosResponse>;
  getCheckToken(agent_id: number): Promise<AxiosResponse>;
}

export class AuthRepository extends BaseRepository implements IAuthRepository {
  postLogin(username: string, password: string): Promise<AxiosResponse> {
    throw new Error("Method not implemented.");
  }
  postLogout(userId: number): Promise<AxiosResponse> {
    throw new Error("Method not implemented.");
  }
  postRefreshToken(refreshToken: string): Promise<AxiosResponse> {
    throw new Error("Method not implemented.");
  }
  getCheckToken(agent_id: number): Promise<AxiosResponse> {
    throw new Error("Method not implemented.");
  }
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
