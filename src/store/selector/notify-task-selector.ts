import { INotifyTaskModel, ITaskMessageItem } from "@store/models/notify-task-model";
import { RootStateType } from "../types";

export const getNotifyTaskSelector = (state: RootStateType): INotifyTaskModel => state.notifyTask;
export const getNotifyCurrentTaskSelector = (state: RootStateType): string | null => state.notifyTask.currentTaskRunning;
export const getNotifyTaskMessagesSelector = (state: RootStateType): ITaskMessageItem[] => state.notifyTask.messages;
