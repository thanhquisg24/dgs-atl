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
    return this.infra.remote.mainApi.postLogin(username, password);
  }

  postLogout(userId: number): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postLogout(userId);
  }

  postRefreshToken(refreshToken: string): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postRefreshToken(refreshToken);
  }

  getCheckToken(agent_id: number): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.getCheckToken(agent_id);
  }
}
