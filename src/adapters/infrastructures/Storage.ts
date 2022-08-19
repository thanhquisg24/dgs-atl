export interface IWebStorage {
  getToken(): {
    token: string;
    refreshToken: string;
  } | null;
  addToken(token: string, refreshToken: string): void;
  removeToken(): void;
  // removeUser(): void;
  // setUser(user: string): void;
  // getUser(): string | null;
}

class WebStorage implements IWebStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
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
  } | null {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const lastLoginTime = this.storage.getItem("lastLoginTime") ? Number(this.storage.getItem("lastLoginTime")) : now;
    const timeSinceLastLogin = now - lastLoginTime;
    if (timeSinceLastLogin < timeAllowed) {
      const token = this.storage.getItem("token");
      const refreshToken = this.storage.getItem("refreshToken");
      if (token !== null && refreshToken !== null) {
        return { token, refreshToken };
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return null;
  }

  addToken(token: string, refreshToken: string): void {
    this.storage.setItem("token", token);
    this.storage.setItem("lastLoginTime", new Date(Date.now()).getTime().toString());
    this.storage.setItem("refreshToken", refreshToken);
  }

  removeToken(): void {
    this.storage.removeItem("token");
    this.storage.removeItem("refreshToken");
    this.storage.removeItem("lastLoginTime");
  }
}

export default WebStorage;
