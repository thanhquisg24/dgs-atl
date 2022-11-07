import { ISocketApi } from "./ISocketApi";
import { IStompConfig } from "../adapters.infrastructures.config";
import Stomp from "stompjs";

export default class SocketAPI implements ISocketApi {
  socket: any;

  emitDestination: string | null;

  onDestination: string | null;

  wsHeaders: { token: string; channel: string } | null;

  STOMP_CONFIG: IStompConfig;

  constructor(STOMP_CONFIG: IStompConfig) {
    this.socket = null;
    this.emitDestination = null;
    this.onDestination = null;
    this.wsHeaders = null;
    this.STOMP_CONFIG = STOMP_CONFIG;
  }

  public connect(): Promise<ISocketApi> {
    // const _ws = new WebSocket(this.STOMP_CONFIG.ENDPOINT);
    // this.socket = Stomp.over(_ws);
    // this.socket = Stomp.overWS(this.STOMP_CONFIG.ENDPOINT);
    this.socket = Stomp.client(this.STOMP_CONFIG.ENDPOINT);
    if (this.STOMP_CONFIG.DEBUG_MODE) {
      this.socket.debug = (e: any) => {
        console.log("SocketAPI -> this.socket.debug -> e", e);
      };
    }
    return new Promise((resolve, reject) => {
      // this.setWsHeaders(_token, _channel);
      this.socket.connect(
        {},
        () => {
          console.log("connection success-> e");

          // this.onMessage("/topic/messages", (msg: null | any) => {
          //     console.log("🚀 ~ file: SocketAPI.ts ~ line 37 ~ SocketAPI ~ this.onMessage ~ msg", msg);
          // });
          resolve(this);
        },
        (error: any) => {
          console.log("🚀 ~ file: SocketAPI.ts ~ line 39 ~ SocketAPI ~ returnnewPromise ~ error", error);
          reject(error);
        },
      );
    });
    // this.socket.connect(
    //     this.wsHeaders,
    //     () => {
    //         this.setWsHeaders(_token, _channel);
    //         this.setEmitDestination(_channel);
    //         this.setOnDestination(_channel);
    //         callback(this);
    //     },
    //     (error: any) => {
    //         callback(error);
    //     },
    // );
  }

  public disconnect(): void {
    this.socket.disconnect(() => {
      this.socket = null;
      this.emitDestination = null;
      this.wsHeaders = null;
    }, {});
  }

  public emit(messageObject: any, channel: string): void {
    if (!this.socket) {
      console.log("No socket connection.");
    } else {
      this.socket.send(channel, this.wsHeaders, messageObject);
    }
  }

  public onMessage(channel: string, callback: any): void {
    this.socket.subscribe(
      channel,
      (msg: { body: string }) => {
        console.log("🚀 ~ file: SocketAPI.ts ~ line 81 ~ SocketAPI ~ onMessage ~ msg", msg);
        // called when the client receives a STOMP message from the server
        if (msg.body.length > 0) {
          // const json_msg = JSON.parse(msg.body);
          callback(msg.body);
        } else {
          callback(null);
        }
      },
      {},
    );
  }
}
