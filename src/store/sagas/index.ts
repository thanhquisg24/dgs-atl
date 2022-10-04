import { all } from "redux-saga/effects";
import { authWatchers } from "./auth-saga";
import { feedWatchers } from "./feed-saga";

export function* rootSaga(): Generator {
  // console.log("Waiting for rehydration");
  // yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  // console.log("Rehydrated");
  yield all([...feedWatchers, ...authWatchers]);
}
