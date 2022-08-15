import { IDegaPlayerUseCase } from "../useCases/dega-player-usercase";

export interface IDegaPlayerPresenter {
  // postAirDropDega(walletPubKey: string): Promise<boolean>;
  // fetchLeaderBoard(): Promise<ILeaderBoardEntity>;
  // fetchLeaderBoardAll(): Promise<ILeaderBoardAllEntity>;
}
export class DegaPlayerPresenter implements IDegaPlayerPresenter {
  readonly useCase: IDegaPlayerUseCase;

  constructor(dealerUseCase: IDegaPlayerUseCase) {
    this.useCase = dealerUseCase;
  }

  // async fetchLeaderBoard(): Promise<ILeaderBoardEntity> {
  //   return this.useCase.fetchLeaderBoard();
  // }

  // async fetchLeaderBoardAll(): Promise<ILeaderBoardAllEntity> {
  //   return this.useCase.fetchLeaderBoardAll();
  // }

  // async postAirDropDega(walletPubKey: string): Promise<boolean> {
  //   return this.useCase.postAirDropDega(walletPubKey);
  // }
}
