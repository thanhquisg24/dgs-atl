export const AXIOS_BASE_URL = process.env.REACT_APP_AXIOS_API || "/api/alm/v1";
export const JWT_TOKEN_EXPIREIN = 1000 * 60 * 3; //3 minute
export interface IFakeSocketConfig {
  IS_RUNNING_FAKE_SOCKET: boolean;
  INTERVAL_FETCH_TIME: number;
}
export const FAKE_SOCKET_CONFIG: IFakeSocketConfig = {
  IS_RUNNING_FAKE_SOCKET: false,
  INTERVAL_FETCH_TIME: 5000,
};
export interface IStompConfig {
  ENDPOINT: string;
  URL_SUBSCRIBE: string;
  URL_SEND_TO_MAP: string;
  DEBUG_MODE: boolean;
}
export const STOMP_CONFIG = {
  //NDPOINT: window.location.protocol === "http:" ? `ws://${baseUrl}/ws` : `wss://${baseUrl}/ws`,
  ENDPOINT: "ws://localhost:8088/alm-ws",
  URL_SUBSCRIBE: "/topic/system-status",
  URL_SEND_TO_MAP: "/system-status",
  DEBUG_MODE: false, //
};
