import { createStore } from "redux";
import rootReducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = configureStore({
//   reducer: rootReducer,
//   // middleware: [sagaMiddleware],
//   // devTools: process.env.NODE_ENV !== "production",
//   // preloadedState,
// });
const store = createStore(rootReducer);
const persister = "Free";

export type RootState = ReturnType<typeof rootReducer>;
export { store, persister };
