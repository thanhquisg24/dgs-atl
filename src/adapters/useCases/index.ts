import { IRepositories } from "../repositories";
import { AuthUseCase, IAuthUseCase } from "./auth-usecase";

import { DegaPlayerUseCase, IDegaPlayerUseCase } from "./dega-player-usercase";

export interface IUseCases {
  degaPlayer: IDegaPlayerUseCase;
  auth: IAuthUseCase;
}

const UseCases = (repositories: IRepositories): IUseCases => {
  return {
    degaPlayer: new DegaPlayerUseCase(repositories.degaPlayer),
    auth: new AuthUseCase(repositories.auth),
  };
};
export default UseCases;
