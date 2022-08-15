import { IRepositories } from "../repositories";

import { DegaPlayerUseCase, IDegaPlayerUseCase } from "./dega-player-usercase";

export interface IUseCases {
  degaPlayer: IDegaPlayerUseCase;
}

const UseCases = (repositories: IRepositories): IUseCases => {
  return {
    degaPlayer: new DegaPlayerUseCase(repositories.degaPlayer),
  };
};
export default UseCases;
