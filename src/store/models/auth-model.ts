import { IUserEntity } from "@adapters/entity";

export interface IAuthModel {
  authChecked: boolean;
  loggedIn: boolean;
  currentUser: IUserEntity | null;
  isLoading: boolean;
}
