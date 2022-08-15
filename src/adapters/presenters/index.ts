import { diUseCases } from "../di";

import { DegaPlayerPresenter, IDegaPlayerPresenter } from "./dega-player-presenter";

export interface IPresenter {
  degaPlayer: IDegaPlayerPresenter;
}

export const presenter = {
  degaPlayer: new DegaPlayerPresenter(diUseCases.degaPlayer),
};
