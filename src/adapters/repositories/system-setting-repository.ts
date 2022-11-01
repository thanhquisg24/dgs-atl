import { ISystemSettingPayload } from "@adapters/dto/SystemSettingPayload";
import { AxiosResponse } from "axios";
import { BaseRepository } from "./base-repository";

export interface ISystemSettingRepository {
  fetAllSystemSettings(): Promise<ISystemSettingPayload>;
  postUpdateSystemSetting(setting: ISystemSettingPayload): Promise<boolean>;
}
export class SystemSettingRepository extends BaseRepository implements ISystemSettingRepository {
  fetAllSystemSettings(): Promise<ISystemSettingPayload> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .fetAllSystemSettings()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { data } = res;
            const map: ISystemSettingPayload = data;
            resolve(map);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }

  postUpdateSystemSetting(setting: ISystemSettingPayload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.infra.remote.mainApi
        .postUpdateSystemSetting(setting)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            resolve(true);
          } else {
            reject(new Error(`Error HTTP status code ${res.status}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
