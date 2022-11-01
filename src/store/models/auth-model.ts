import { IJwtEntity } from "@adapters/entity";

export interface IAuthModel {
  authChecked: boolean;
  loggedIn: boolean;
  currentUser: string | null;
  jwt: IJwtEntity | null;
  isLoading: boolean;
}
