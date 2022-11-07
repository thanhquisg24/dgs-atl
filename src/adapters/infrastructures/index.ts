import Remote, { IRemote } from "./Remote";
import { ISocketApi } from "./socket/ISocketApi";
import { socketIns } from "./socket/SocketManager";
import WebStorage, { IWebStorage } from "./Storage";

export interface IInfrastructures {
  remote: IRemote;
  webStorage: IWebStorage;
  socketIns: ISocketApi;
}

export default (): IInfrastructures => {
  return {
    remote: new Remote(),
    webStorage: new WebStorage(),
    socketIns,
  };
};
