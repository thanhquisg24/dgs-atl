import { IJwtEntity, IUserEntity } from "@adapters/entity";
import { IAuthRepository } from "@adapters/repositories/auth-repository";
import { AxiosResponse } from "axios";
import { diInfrastructures } from "../di/index";

export interface IAuthUseCase {
  postLogin(username: string, password: string): Promise<IUserEntity>;
  postLogout(userId: number): Promise<string>;
  postRefreshToken(refreshToken: string): Promise<IJwtEntity>;
  getCheckToken(token: string): Promise<boolean>;
  checkInitLocalStorageLogin(): Promise<IUserEntity>;
}
export class AuthUseCase implements IAuthUseCase {
  readonly repository: IAuthRepository;

  constructor(sessionRepositories: IAuthRepository) {
    this.repository = sessionRepositories;
  }

  checkInitLocalStorageLogin(): Promise<IUserEntity> {
    const store = diInfrastructures.webStorage.getToken();
    console.log("🚀 ~ file: auth-usecase.ts ~ line 22 ~ AuthUseCase ~ checkInitLocalStorageLogin ~ store", store);
    if (store === null) {
      return Promise.reject(new Error("Not found token in sore "));
    }
    return new Promise((resolve, reject) => {
      this.repository
        .getCheckToken(store.token)
        .then((res: AxiosResponse) => {
          console.log("🚀 ~ file: auth-usecase.ts ~ line 30 ~ AuthUseCase ~ .then ~ res", res);
          if (res.status === 200) {
            const { data } = res;
            if (data._rcode === "SUCCESS") {
              const user: IUserEntity = {
                ...data,
                ...store,
                tokenExpiration: 3600,
                type: "Bearer ",
              };
              resolve(user);
            }
          }
          reject(new Error(`CheckToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  private storeAuth(token: string, refreshToken: string): void {
    diInfrastructures.webStorage.addToken(token, refreshToken);
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
            if (data._rcode === "SUCCESS") {
              this.storeAuth(res.data.token, res.data.refreshToken);
              resolve(res.data);
            }
          }
          reject(new Error(`Login Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  postLogout(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.repository
        .postLogout(userId)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            if (data._rcode === "SUCCESS") {
              this.removeAuth();
              resolve("Logout Success!");
            }
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
            if (data._rcode === "SUCCESS") {
              this.storeAuth(res.data.accessToken, res.data.refreshToken);
              resolve(res.data);
            }
          }
          reject(new Error(`RefreshToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }

  getCheckToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.repository
        .getCheckToken(token)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            if (data._rcode === "SUCCESS") {
              resolve(true);
            }
          }
          reject(new Error(`CheckToken Error HTTP status code ${res.status}`));
        })
        .catch((error) => reject(error));
    });
  }
}
