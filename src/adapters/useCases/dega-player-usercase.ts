import { AxiosResponse } from "axios";
import { IDegaPlayerRepository } from "../repositories/dega-player-repository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDegaPlayerUseCase {
  // postAirDropDega(walletPubKey: string): Promise<boolean>;
  // fetchLeaderBoard(): Promise<ILeaderBoardEntity>;
  // fetchLeaderBoardAll(): Promise<ILeaderBoardAllEntity>;
}
export class DegaPlayerUseCase implements IDegaPlayerUseCase {
  readonly repository: IDegaPlayerRepository;

  constructor(sessionRepositories: IDegaPlayerRepository) {
    this.repository = sessionRepositories;
  }

  // fetchLeaderBoard(): Promise<ILeaderBoardEntity> {
  //   return new Promise((resolve, reject) => {
  //     this.repository
  //       .fetchLeaderBoard()
  //       .then((res: AxiosResponse) => {
  //         if (res.status === 200) {
  //           const { data } = res;
  //           if (data._rcode === "SUCCESS") {
  //             resolve(res.data);
  //           }
  //         }
  //         reject(new Error(`Fetch Data Error HTTP status code ${res.status}`));
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }

  // fetchLeaderBoardAll(): Promise<ILeaderBoardAllEntity> {
  //   return new Promise((resolve, reject) => {
  //     this.repository
  //       .fetchLeaderBoardAll()
  //       .then((res: AxiosResponse) => {
  //         if (res.status === 200) {
  //           const { data } = res;
  //           if (data._rcode === "SUCCESS") {
  //             resolve(res.data);
  //           }
  //         }
  //         reject(new Error(`Fetch Data Error HTTP status code ${res.status}`));
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }

  // postAirDropDega(walletPubKey: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.repository
  //       .postAirDropDega(walletPubKey)
  //       .then((res: AxiosResponse) => {
  //         if (res.status === 200) {
  //           const { data } = res;
  //           if (data._rcode === "SUCCESS") {
  //             resolve(true);
  //           }
  //           reject(new Error(`You can only request airdrop once a day!`));
  //         } else {
  //           reject(new Error(`Airdrop Error HTTP status code ${res.status}`));
  //         }
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }
}
