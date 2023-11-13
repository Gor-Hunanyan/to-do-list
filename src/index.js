import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Board from './components/Board/Board';
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Board />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
