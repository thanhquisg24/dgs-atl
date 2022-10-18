export interface IWebStorage {
  getToken(): {
    token: string;
    refreshToken: string;
    username: string;
  } | null;
  addToken(token: string, refreshToken: string, username: string): void;
  setToken(token: string, refreshToken: string): void;
  removeToken(): void;
  // removeUser(): void;
  // setUser(user: string): void;
  // getUser(): string | null;
}

class WebStorage implements IWebStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  // removeUser(): void {
  //   this.storage.removeItem("auth_user");
  // }

  // setUser(user: string): void {
  //   this.storage.setItem("auth_user", user);
  // }

  // getUser(): string | null {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   return this.storage.getItem("auth_user")!;
  // }

  getToken(): {
    token: string;
    refreshToken: string;
    username: string;
  } | null {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const lastLoginTime = this.storage.getItem("lastLoginTime") ? Number(this.storage.getItem("lastLoginTime")) : now;
    const timeSinceLastLogin = now - lastLoginTime;
    if (timeSinceLastLogin < timeAllowed) {
      const token = this.storage.getItem("token");
      const refreshToken = this.storage.getItem("refreshToken");
      const username = this.storage.getItem("username");
      if (token !== null && refreshToken !== null && username !== null) {
        return { token, refreshToken, username };
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return null;
  }

  addToken(token: string, refreshToken: string, username: string): void {
    this.storage.setItem("username", username);
    this.storage.setItem("token", token);
    this.storage.setItem("lastLoginTime", new Date(Date.now()).getTime().toString());
    this.storage.setItem("refreshToken", refreshToken);
  }

  setToken(token: string, refreshToken: string): void {
    this.storage.setItem("token", token);
    this.storage.setItem("lastLoginTime", new Date(Date.now()).getTime().toString());
    this.storage.setItem("refreshToken", refreshToken);
  }

  removeToken(): void {
    this.storage.removeItem("username");
    this.storage.removeItem("token");
    this.storage.removeItem("refreshToken");
    this.storage.removeItem("lastLoginTime");
  }
}

export default WebStorage;
