// base
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// store
import store from "./store";

// custom components
import App from "./App";

// styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
