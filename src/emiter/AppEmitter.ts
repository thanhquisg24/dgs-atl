import { EventEmitter as Emitter } from "eventemitter3";

const AppEmitterSingleton = (() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instance: any;

  function createInstance() {
    return new Emitter(); // tạo object rỗng, có thể thay bằng Class khác
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
export const AppEmitter = AppEmitterSingleton.getInstance();

export const NOTIFY = "NOTIFY";
export const CONNECT_WALLET_MODAL = "CONNECT_WALLET_MODAL";
export const VIEW_WALLET_MODAL = "VIEW_WALLET_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
// eslint-disable-next-line no-shadow
export enum NOTIFY_TYPE {
  ERROR,
  SUCCESS,
  DEFAULT,
}

export const emitCloseModal = (): void => {
  AppEmitter.emit(CLOSE_MODAL);
};

export const emitConnectWalletModal = (child: string | JSX.Element): void => {
  AppEmitter.emit(CONNECT_WALLET_MODAL, { child });
};

export const emitViewWalletModal = (child: string | JSX.Element): void => {
  AppEmitter.emit(VIEW_WALLET_MODAL, { child });
};

export const notifyMessageDefault = (
  msg: string,
  description?: string | JSX.Element | null,
  txid?: string | string[],
): void => {
  AppEmitter.emit(NOTIFY, { type: NOTIFY_TYPE.DEFAULT, msg, description, txid });
};
export const notifyMessageSuccess = (
  msg: string,
  description?: string | JSX.Element | null,
  txid?: string | string[],
): void => {
  AppEmitter.emit(NOTIFY, { type: NOTIFY_TYPE.SUCCESS, msg, description, txid });
};
export const notifyMessageError = (
  msg: string,
  description?: string | JSX.Element | null,
  txid?: string | string[],
): void => {
  AppEmitter.emit(NOTIFY, { type: NOTIFY_TYPE.ERROR, msg, description, txid });
};

export const REFRESH_UNMATCH_WAGER = "REFRESH_UNMATCH_WAGER";
export const emitRefreshUnMatchWager = (): void => {
  AppEmitter.emit(REFRESH_UNMATCH_WAGER);
};

export const REFRESH_GAMES = "REFRESH_GAMES";
export const emitRefreshGames = (): void => {
  AppEmitter.emit(REFRESH_GAMES);
};

export const TOGGLE_SPORT_MOBILE_MENU = "TOGGLE_SPORT_MOBILE_MENU";
export const emitToggleSportMenuMobile = (isShow?: boolean): void => {
  AppEmitter.emit(TOGGLE_SPORT_MOBILE_MENU, { isShow });
};

export const TOGGLE_BAR_BETSLIP_MENU = "TOGGLE_BAR_BETSLIP_MENU";
export const emitToggleBarBetSlipMenu = (_barItemActiveIndex: number): void => {
  AppEmitter.emit(TOGGLE_SPORT_MOBILE_MENU, { _barItemActiveIndex });
};
