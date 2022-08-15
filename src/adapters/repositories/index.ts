import { IInfrastructures } from "../infrastructures";
import { DegaPlayerRepository, IDegaPlayerRepository } from "./dega-player-repository";

export interface IRepositories {
  degaPlayer: IDegaPlayerRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    degaPlayer: new DegaPlayerRepository(infrastructure),
  };
};
