export interface IJwtEntity {
  token: string;
  type: string;
  refreshToken: string;
  expiresIn: number;
  createdAt: number;
}
