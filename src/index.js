import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import Board from "./components/Board/Board";
import BoardsNav from "./components/BoardsNav/BoardsNav";
import BoardHeader from "./components/BoardHeader/BoardHeader";
import { store } from "./store";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BoardHeader />
      <BoardsNav />
      <Board />
    </Provider>
  </StrictMode>
);
