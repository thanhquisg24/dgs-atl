import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer, { initialState } from "./reducers";
import { rootSaga } from "./sagas";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION__: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const sagaMiddleware = createSagaMiddleware();
const preloadedState = initialState;
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export { store };

export * from "./actions/dega-sport-action";
export * from "./actions/themes-actions";

export * from "./models/dega-sport-model";

export * from "./selector/dega-sport-selectors";
