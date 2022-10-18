import { IJwtEntity, IUserEntity } from "@adapters/entity";
import { setAxiosHeaderAuth } from "@adapters/infrastructures/axios/customeAxios";
import { IAuthRepository } from "@adapters/repositories/auth-repository";
import { AxiosResponse } from "axios";
import { diInfrastructures } from "../di/index";

export interface IAuthUseCase {
  postLogin(username: string, password: string): Promise<IUserEntity>;
  postLogout(username: string): Promise<string>;
  postRefreshToken(refreshToken: string): Promise<IJwtEntity>;
  postCheckToken(token: string): Promise<boolean>;
  checkInitLocalStorageLogin(): Promise<IUserEntity>;
}
export class AuthUseCase implements IAuthUseCase {
  readonly repository: IAuthRepository;

  constructor(sessionRepositories: IAuthRepository) {
    this.repository = sessionRepositories;
  }

  checkInitLocalStorageLogin(): Promise<IUserEntity> {
    const store = diInfrastructures.webStorage.getToken();
    if (store === null) {
      return Promise.reject(new Error("Not found token in store "));
    }
    setAxiosHeaderAuth(store.token);
    return new Promise((resolve, reject) => {
      this.repository
        .postCheckToken(store.refreshToken)
        .then((res: AxiosResponse) => {
          console.log("🚀 ~ file: auth-usecase.ts ~ line 30 ~ AuthUseCase ~ .then ~ res", res);
          if (res.status === 200) {
            // const { data } = res;
            const user: IUserEntity = {
              // ...data,
              ...store,
              type: "Bearer ",
            };
            console.log("🚀 ~ file: auth-usecase.ts ~ line 34 ~ AuthUseCase ~ .then ~ user", user);
            resolve(user);
          }
          reject(new Error(`CheckToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  private storeAuth(token: string, refreshToken: string, username: string): void {
    diInfrastructures.webStorage.addToken(token, refreshToken, username);
  }

  private removeAuth(): void {
    diInfrastructures.webStorage.removeToken();
  }

  postLogin(username: string, password: string): Promise<IUserEntity> {
    return new Promise((resolve, reject) => {
      this.repository
        .postLogin(username, password)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            this.storeAuth(data.token, data.refreshToken, data.username);
            setAxiosHeaderAuth(data.token);
            resolve(data);
          }
          reject(new Error(`Login Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  postLogout(username: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.repository
        .postLogout(username)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            this.removeAuth();
            setAxiosHeaderAuth("");
            resolve("Logout Success!");
          }
          reject(new Error(`Logout Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  postRefreshToken(refreshToken: string): Promise<IJwtEntity> {
    return new Promise((resolve, reject) => {
      this.repository
        .postRefreshToken(refreshToken)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            diInfrastructures.webStorage.setToken(data.accessToken, data.refreshToken);
            resolve(res.data);
          }
          reject(new Error(`RefreshToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  postCheckToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.repository
        .postCheckToken(token)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            resolve(true);
          }
          reject(new Error(`CheckToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }
}
