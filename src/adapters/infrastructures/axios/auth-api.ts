import { AxiosInstance, AxiosResponse } from "axios";
import queryString from "query-string";

export interface IAuthApi {
  postLogin(username: string, password: string): Promise<AxiosResponse>;
  postLogout(userId: number): Promise<AxiosResponse>;
  postRefreshToken(refreshToken: string): Promise<AxiosResponse>;
  getCheckToken(token: string): Promise<AxiosResponse>;
}

export class AuthApi implements IAuthApi {
  Axios: AxiosInstance;

  constructor(_customAxios: AxiosInstance) {
    this.Axios = _customAxios;
  }

  getCheckToken(token: string): Promise<AxiosResponse<any, any>> {
    return this.Axios.get("/agent/auth/check_token", {
      params: {
        token,
      },
    });
  }

  postLogin(username: string, password: string): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      username,
      password,
    });
    return this.Axios.post("/agent/auth/signin", xFromData);
  }

  postLogout(userId: number): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      userId,
    });
    return this.Axios.post("/agent/auth/logout", xFromData);
  }

  postRefreshToken(refreshToken: string): Promise<AxiosResponse<any, any>> {
    const xFromData = queryString.stringify({
      refreshToken,
    });
    return this.Axios.post("/agent/auth/refresh-token", xFromData);
  }
}
