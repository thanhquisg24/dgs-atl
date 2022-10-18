export interface IJwtEntity {
  token: string;
  type: string;
  refreshToken: string;
  tokenExpiration?: number;
}
