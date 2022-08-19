import { IInfrastructures } from "../infrastructures";
import { AuthRepository, IAuthRepository } from "./auth-repository";
import { DegaPlayerRepository, IDegaPlayerRepository } from "./dega-player-repository";

export interface IRepositories {
  degaPlayer: IDegaPlayerRepository;
  auth: IAuthRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    degaPlayer: new DegaPlayerRepository(infrastructure),
    auth: new AuthRepository(infrastructure),
  };
};
