export interface IDonbestSetting {
  apiKey: string;
  streamUsername: string;
  streamPassword: string;
  streamBrokerUrl: string;
}
export interface IALMSetting {
  almUser: string;
  almIdUser: number;
}

export interface ISystemSettingPayload {
  donbestSetting: IDonbestSetting;
  almSetting: IALMSetting;
}
