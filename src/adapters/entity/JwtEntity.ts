import { IBaseEntity } from "./BaseEntity";

export interface IJwtEntity extends IBaseEntity {
  token: string;
  type: string;
  refreshToken: string;
  username: string;
}
