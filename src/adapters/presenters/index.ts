import { diUseCases } from "../di";
import { DegaGamePresenter, IDegaGamePresenter } from "./dega-game-presenter";
import { DegaLeaguePresenter, IDegaLeaguePresenter } from "./dega-league-presenter";
import { DegaPlayerPresenter, IDegaPlayerPresenter } from "./dega-player-presenter";
import { DegaSportPresenter, IDegaSportPresenter } from "./dega-sport-presenter";
import { DegaWagerPresenter, IDegaWagerPresenter } from "./dega-wager-presenter";

export interface IPresenter {
  degaSport: IDegaSportPresenter;
  degaLeague: IDegaLeaguePresenter;
  degaGame: IDegaGamePresenter;
  degaWager: IDegaWagerPresenter;
  degaPlayer: IDegaPlayerPresenter;
}

export const presenter = {
  degaSport: new DegaSportPresenter(diUseCases.degaSport),
  degaLeague: new DegaLeaguePresenter(diUseCases.degaLeague),
  degaGame: new DegaGamePresenter(diUseCases.degaGame),
  degaWager: new DegaWagerPresenter(diUseCases.degaWager),
  degaPlayer: new DegaPlayerPresenter(diUseCases.degaPlayer),
};
