import { createAction } from "@reduxjs/toolkit";
import { CombineFeedTask } from "../feed-task-queue/FeedTaskQueueModel";

export type ITaskChannelPayload = CombineFeedTask;

// export type ITaskChannelPayload = {
//   taskObject: string;
//   taskType?: string;
//   payload?: string;
// };

export const taskStartAction = createAction<string>("task/JOB_START");
export const taskSuccessAction = createAction<string>("task/JOB_DONE");
export const taskFailAction = createAction<string>("task/JOB_FAIL");

export const taskChannelRequestAction = createAction<ITaskChannelPayload>("task/REQUEST_CHANNEL");
export type CombineNotifyTaskActionTypes = ReturnType<typeof taskStartAction> | ReturnType<typeof taskSuccessAction> | ReturnType<typeof taskFailAction> | ReturnType<typeof taskChannelRequestAction>;
