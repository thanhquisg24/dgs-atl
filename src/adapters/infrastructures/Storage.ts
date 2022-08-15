export interface IWebStorage {
  getToken(): string | null;
  addToken(token: string): void;
  removeToken(): void;
  removeUser(): void;
  setUser(user: string): void;
  getUser(): string | null;
}

class WebStorage implements IWebStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  removeUser(): void {
    this.storage.removeItem("auth_user");
  }

  setUser(user: string): void {
    this.storage.setItem("auth_user", user);
  }

  getUser(): string | null {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.storage.getItem("auth_user")!;
  }

  getToken(): string | null {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const lastLoginTime = this.storage.getItem("lastLoginTime") ? Number(this.storage.getItem("lastLoginTime")) : now;
    const timeSinceLastLogin = now - lastLoginTime;
    if (timeSinceLastLogin < timeAllowed) {
      return this.storage.getItem("token");
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return null;
  }

  addToken(token: string): void {
    this.storage.setItem("token", token);
    this.storage.setItem("lastLoginTime", new Date(Date.now()).getTime().toString());
  }

  removeToken(): void {
    this.storage.removeItem("token");
  }
}

export default WebStorage;
