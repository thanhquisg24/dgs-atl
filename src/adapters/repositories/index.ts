import { IInfrastructures } from "../infrastructures";
import { AuthRepository, IAuthRepository } from "./auth-repository";
import { DegaPlayerRepository, IDegaPlayerRepository } from "./dega-player-repository";
import { DonbestLeagueRepository, IDonbestLeagueRepository } from "./donbest-league-repository";

export interface IRepositories {
  degaPlayer: IDegaPlayerRepository;
  auth: IAuthRepository;
  donbestLeague: IDonbestLeagueRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    degaPlayer: new DegaPlayerRepository(infrastructure),
    auth: new AuthRepository(infrastructure),
    donbestLeague: new DonbestLeagueRepository(infrastructure),
  };
};
