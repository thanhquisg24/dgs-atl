import { IUserEntity } from "@adapters/entity";
import { JWT_TOKEN_EXPIREIN } from "./adapters.infrastructures.config";

const TOKEN_STORAGE_NAME = "almJwtToken";
export interface IWebStorage {
  getToken(): {
    token: string;
    refreshToken: string;
    username: string;
    type: string;
    expiresIn: number;
    createdAt: number;
  } | null;
  addToken(token: string, refreshToken: string, username: string): void;
  setToken(token: string, refreshToken: string): void;
  removeToken(): void;
}

class WebStorage implements IWebStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getToken(): {
    token: string;
    refreshToken: string;
    username: string;
    type: string;
    expiresIn: number;
    createdAt: number;
  } | null {
    const strt = this.storage.getItem(TOKEN_STORAGE_NAME);
    const almJwtToken = strt ? JSON.parse(strt) : null;
    return almJwtToken;
  }

  addToken(token: string, refreshToken: string, username: string): void {
    const currentTimestamp = Date.now();
    const almJwtToken: IUserEntity = {
      username,
      token,
      type: "Bearer ",
      refreshToken,
      expiresIn: JWT_TOKEN_EXPIREIN,
      createdAt: currentTimestamp,
    };
    this.storage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(almJwtToken));
  }

  setToken(token: string, refreshToken: string): void {
    const o = this.getToken();
    if (o !== null) {
      const currentTimestamp = Date.now();
      const almJwtToken: IUserEntity = {
        username: o.username,
        token,
        type: "Bearer ",
        refreshToken,
        expiresIn: JWT_TOKEN_EXPIREIN,
        createdAt: currentTimestamp,
      };
      this.storage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(almJwtToken));
    }
  }

  removeToken(): void {
    this.storage.removeItem(TOKEN_STORAGE_NAME);
  }
}

export default WebStorage;
