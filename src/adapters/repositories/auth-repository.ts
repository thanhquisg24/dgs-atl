import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface IAuthRepository {
  postLogin(username: string, password: string): Promise<AxiosResponse>;
  postLogout(username: string): Promise<AxiosResponse>;
  postRefreshToken(refreshToken: string): Promise<AxiosResponse>;
  postCheckToken(token: string): Promise<AxiosResponse>;
}

export class AuthRepository extends BaseRepository implements IAuthRepository {
  postLogin(username: string, password: string): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postLogin(username, password);
  }

  postLogout(username: string): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postLogout(username);
  }

  postRefreshToken(refreshToken: string): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postRefreshToken(refreshToken);
  }

  postCheckToken(token: string): Promise<AxiosResponse> {
    return this.infra.remote.mainApi.postCheckToken(token);
  }
}
