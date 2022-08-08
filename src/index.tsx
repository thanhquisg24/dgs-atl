// style + assets
import "./assets/scss/style.scss";

// project imports
import App from "./App";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import config from "./config";
import { store } from "./store";

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
