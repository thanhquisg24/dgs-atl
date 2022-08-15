// import { REHYDRATE } from "redux-persist";
import { all } from "redux-saga/effects";
import { degaSportWatchers } from "./dega-sport-saga";

export function* rootSaga(): Generator {
  // console.log("Waiting for rehydration");
  // yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  // console.log("Rehydrated");
  yield all([...degaSportWatchers]);
}
