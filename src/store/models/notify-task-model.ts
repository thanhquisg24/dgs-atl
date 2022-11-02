// eslint-disable-next-line no-shadow
export enum TaskStatus {
  START = "START",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}
export interface ITaskMessageItem {
  text: string;
  status: TaskStatus;
  time: Date;
}

export interface INotifyTaskModel {
  messages: ITaskMessageItem[];
  currentTaskRunning: string | null;
}
