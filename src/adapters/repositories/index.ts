import { IInfrastructures } from "../infrastructures";
import { AuthRepository, IAuthRepository } from "./auth-repository";
import { DegaPlayerRepository, IDegaPlayerRepository } from "./dega-player-repository";
import { DGSLeagueRepository, IDGSLeagueRepository } from "./dgs-league-repository";
import { DonbestFilterRepository, IDonbestFilterRepository } from "./donbest-filter-repository";
import { DonbestLeagueRepository, IDonbestLeagueRepository } from "./donbest-league-repository";

export interface IRepositories {
  degaPlayer: IDegaPlayerRepository;
  auth: IAuthRepository;
  donbestLeague: IDonbestLeagueRepository;
  dgsLeague: IDGSLeagueRepository;
  donbestFilter: IDonbestFilterRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    degaPlayer: new DegaPlayerRepository(infrastructure),
    auth: new AuthRepository(infrastructure),
    donbestLeague: new DonbestLeagueRepository(infrastructure),
    dgsLeague: new DGSLeagueRepository(infrastructure),
    donbestFilter: new DonbestFilterRepository(infrastructure),
  };
};
