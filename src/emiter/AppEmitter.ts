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
export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";

export const emitCloseModal = (): void => {
  AppEmitter.emit(CLOSE_MODAL);
};
export const emitStartLoading = (): void => {
  AppEmitter.emit(START_LOADING);
};
export const emitStopLoading = (): void => {
  AppEmitter.emit(END_LOADING);
};

export const emitConnectWalletModal = (child: string | JSX.Element): void => {
  AppEmitter.emit(CONNECT_WALLET_MODAL, { child });
};

export const emitViewWalletModal = (child: string | JSX.Element): void => {
  AppEmitter.emit(VIEW_WALLET_MODAL, { child });
};
// "success" | "info" | "warning" | "error"
export const notifyMessageInfo = (msg: string, description?: string | JSX.Element | null): void => {
  AppEmitter.emit(NOTIFY, { type: "info", msg, description });
};
export const notifyMessageSuccess = (msg: string, description?: string | JSX.Element | null): void => {
  AppEmitter.emit(NOTIFY, { type: "success", msg, description });
};
export const notifyMessageError = (msg: string, description?: string | JSX.Element | null): void => {
  AppEmitter.emit(NOTIFY, { type: "error", msg, description });
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
