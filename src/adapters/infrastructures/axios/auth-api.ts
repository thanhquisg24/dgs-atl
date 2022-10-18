import { AxiosInstance, AxiosResponse } from "axios";

export interface IAuthApi {
  postLogin(username: string, password: string): Promise<AxiosResponse>;
  postLogout(username: string): Promise<AxiosResponse>;
  postRefreshToken(refreshToken: string): Promise<AxiosResponse>;
  postCheckToken(refreshToken: string): Promise<AxiosResponse>;
}

export class AuthApi implements IAuthApi {
  Axios: AxiosInstance;

  constructor(_customAxios: AxiosInstance) {
    this.Axios = _customAxios;
  }

  postCheckToken(refreshToken: string): Promise<AxiosResponse<any, any>> {
    return this.Axios.post("/auth/check_token", { refreshToken });
  }

  postLogin(username: string, password: string): Promise<AxiosResponse<any, any>> {
    const payload = {
      username,
      password,
    };
    return this.Axios.post("/auth/signin", payload);
  }

  postLogout(username: string): Promise<AxiosResponse<any, any>> {
    const payload = {
      username,
    };
    return this.Axios.post("/auth/logout", payload);
  }

  postRefreshToken(refreshToken: string): Promise<AxiosResponse<any, any>> {
    const payload = {
      refreshToken,
    };
    return this.Axios.post("/auth/refresh-token", payload);
  }

  // postLogin(username: string, password: string): Promise<AxiosResponse<any, any>> {
  //   const jwt = {
  //     token:
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJERUFMRVIiXSwiZXhwIjoxNjE1MTk0Mzg4LCJ1c2VyIjoiZGVhbGVyMSIsInNpZCI6IkVWNUR2UW5WYm4waXY4YmYwN3IxSXZ0UDE2MTQ5MzUxODgifQ.ssCT8zU9o5zdvbfsPHL8dlodejHzUXfe8ZYT7dzfeBw",
  //     type: "Bearer",
  //     refreshToken: "tstokenasd",
  //     username: "alex",
  //     userId: 1,
  //     tokenExpiration: 3000,
  //     _rcode: "SUCCESS",
  //   };
  //   const data: AxiosResponse<any, any> = { data: jwt, status: 200, statusText: "OK", headers: {}, config: {} };
  //   return Promise.resolve(data);
  // }

  // postLogout(userId: number): Promise<AxiosResponse<any, any>> {
  //   const msg = {
  //     message: "logout successfully",
  //     _rcode: "SUCCESS",
  //   };
  //   const data: AxiosResponse<any, any> = { data: msg, status: 200, statusText: "OK", headers: {}, config: {} };
  //   return Promise.resolve(data);
  // }

  // getCheckToken(token: string): Promise<AxiosResponse<any, any>> {
  //   const user = {
  //     _rcode: "SUCCESS",
  //     status: "ok",
  //     agentId: 1,
  //     username: "agent test",
  //   };
  //   const data: AxiosResponse<any, any> = { data: user, status: 200, statusText: "OK", headers: {}, config: {} };
  //   return Promise.resolve(data);
  // }

  // postRefreshToken(refreshToken: string): Promise<AxiosResponse<any, any>> {
  //   const rsJwt = {
  //     accessToken: "asdasdsadsadjuiohywertiuyuewryewry",
  //     refreshToken: "rstoken",
  //     tokenType: "Bearer",
  //   };
  //   const data: AxiosResponse<any, any> = { data: rsJwt, status: 200, statusText: "OK", headers: {}, config: {} };
  //   return Promise.resolve(data);
  // }
}
