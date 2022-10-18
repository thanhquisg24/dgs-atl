import { IJwtEntity } from "./JwtEntity";

export interface IUserEntity extends IJwtEntity {
  username: string;
}
