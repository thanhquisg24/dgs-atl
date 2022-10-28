// eslint-disable-next-line no-shadow
export enum TaskStatus {
  START = "START",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}
export interface ITaskMessageItem {
  text: string;
  status: TaskStatus;
  time: string;
}

export interface INotifyTaskModel {
  messages: ITaskMessageItem[];
  currentTaskRunning: string | null;
}
