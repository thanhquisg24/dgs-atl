// import { notifyMessageError } from "@emiter/AppEmitter";
import { taskChannelRequestAction, taskFailAction, taskStartAction, taskSuccessAction } from "../actions/notify-task-action";
import { actionChannel, call, delay, fork, put, take } from "redux-saga/effects";
import { processFeedTask } from "@store/feed-task-queue/ProcessFeedTask";

function* addNotifiTaskSaga(action: ReturnType<typeof taskChannelRequestAction>) {
  console.log("REQUEST START: ", action.payload.taskObject);
  // const { taskObject, taskType, payload } = action.payload;
  try {
    // const result = yield axios.get(`https://jsonplaceholder.typicode.com/todos`);
    yield put(taskStartAction(`Start :${action.payload.taskObject}`));
    yield delay(2000);
    const result: boolean = yield processFeedTask(action.payload);
    if (result) {
      yield put(taskSuccessAction(`Done :${action.payload.taskObject}`));
    } else {
      yield put(taskFailAction(`Failure :${action.payload.taskObject}`));
    }
  } catch (error) {
    yield put(taskFailAction(`Failure :${action.payload.taskObject}`));
    // notifyMessageError("")
  } finally {
    console.log("REQUEST END: ", action.payload.taskObject);
  }
}

export function* addNotifiTaskChannel() {
  //@ts-ignore
  const requestChannel: any = yield actionChannel("task/REQUEST_CHANNEL");
  while (true) {
    const action: ReturnType<typeof taskChannelRequestAction> = yield take(requestChannel);
    yield call(addNotifiTaskSaga, action);
  }
}
export const notifyTaskWatchers = [fork(addNotifiTaskChannel)];
