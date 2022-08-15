import { IInfrastructures } from "../infrastructures";
import { DegaGameRepository, IDegaGameRepository } from "./dega-game-repository";
import { DegaLeagueRepository, IDegaLeagueRepository } from "./dega-league-repository";
import { DegaPlayerRepository, IDegaPlayerRepository } from "./dega-player-repository";
import { DegaSportRepository, IDegaSportRepository } from "./dega-sport-repository";
import { DegaWagerRepository, IDegaWagerRepository } from "./dega-wager-repository";

export interface IRepositories {
  degaSport: IDegaSportRepository;
  degaLeague: IDegaLeagueRepository;
  degaGame: IDegaGameRepository;
  degaWager: IDegaWagerRepository;
  degaPlayer: IDegaPlayerRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    degaSport: new DegaSportRepository(infrastructure),
    degaLeague: new DegaLeagueRepository(infrastructure),
    degaGame: new DegaGameRepository(infrastructure),
    degaWager: new DegaWagerRepository(infrastructure),
    degaPlayer: new DegaPlayerRepository(infrastructure),
  };
};
