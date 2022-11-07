import { STOMP_CONFIG } from "../adapters.infrastructures.config";

import { ISocketApi } from "./ISocketApi";
import SocketAPI from "./SocketAPI";

// eslint-disable-next-line wrap-iife
const SocketAPISingletion = (() => {
  let instance: ISocketApi;

  function createInstance() {
    return new SocketAPI(STOMP_CONFIG);
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
export const socketIns: ISocketApi = SocketAPISingletion.getInstance();
