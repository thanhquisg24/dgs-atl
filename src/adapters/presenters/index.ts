import { diUseCases } from "../di";
import { AuthPresenter, IAuthPresenter } from "./auth-presenter";

import { DegaPlayerPresenter, IDegaPlayerPresenter } from "./dega-player-presenter";

export interface IPresenter {
  degaPlayer: IDegaPlayerPresenter;
  auth: IAuthPresenter;
}

export const presenter = {
  degaPlayer: new DegaPlayerPresenter(diUseCases.degaPlayer),
  auth: new AuthPresenter(diUseCases.auth),
};

export { diInfrastructures, diRepositorires } from "../di";
