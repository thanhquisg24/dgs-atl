import { IInfrastructures } from "../infrastructures";
import { AuthRepository, IAuthRepository } from "./auth-repository";
import { DgsLineTypeRepository, IDgsLineTypeRepository } from "./dgs-linetype-repository";
import { DGSGameRepository, IDGSGameRepository } from "./dgs-game-repository";
import { DGSLeagueRepository, IDGSLeagueRepository } from "./dgs-league-repository";
import { DonbestFilterRepository, IDonbestFilterRepository } from "./donbest-filter-repository";
import { DonbestLeagueRepository, IDonbestLeagueRepository } from "./donbest-league-repository";
import { ISportMappingRepository, SportMappingRepository } from "./sport-mapping-repository";

export interface IRepositories {
  dgsLineTypeLink: IDgsLineTypeRepository;
  auth: IAuthRepository;
  donbestLeague: IDonbestLeagueRepository;
  dgsLeague: IDGSLeagueRepository;
  dgsGame: IDGSGameRepository;
  donbestFilter: IDonbestFilterRepository;
  sportMapping: ISportMappingRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    dgsLineTypeLink: new DgsLineTypeRepository(infrastructure),
    auth: new AuthRepository(infrastructure),
    donbestLeague: new DonbestLeagueRepository(infrastructure),
    dgsLeague: new DGSLeagueRepository(infrastructure),
    dgsGame: new DGSGameRepository(infrastructure),
    donbestFilter: new DonbestFilterRepository(infrastructure),
    sportMapping: new SportMappingRepository(infrastructure),
  };
};
