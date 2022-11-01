import { createReducer } from "@reduxjs/toolkit";
import { taskFailAction, taskStartAction, taskSuccessAction } from "@store/actions/notify-task-action";
import { INotifyTaskModel, TaskStatus } from "@store/models/notify-task-model";
import { getDate } from "@utils/date-format";

export const initialNotifyTask: INotifyTaskModel = {
  messages: [],
  currentTaskRunning: null,
};

const notifyTaskReducer = createReducer(initialNotifyTask as INotifyTaskModel, (builder) => {
  builder.addCase(taskStartAction, (state, action) => {
    const msgItem = {
      text: action.payload,
      status: TaskStatus.START,
      time: getDate(),
    };
    state.messages.unshift(msgItem);
    state.currentTaskRunning = action.payload;
    return state;
  });
  builder.addCase(taskSuccessAction, (state, action) => {
    const msgItem = {
      text: action.payload,
      status: TaskStatus.SUCCESS,
      time: getDate(),
    };
    state.messages.unshift(msgItem);
    state.currentTaskRunning = null;
    return state;
  });
  builder.addCase(taskFailAction, (state, action) => {
    const msgItem = {
      text: action.payload,
      status: TaskStatus.FAIL,
      time: getDate(),
    };
    state.messages.unshift(msgItem);
    state.currentTaskRunning = null;
    return state;
  });
});

export default notifyTaskReducer;
