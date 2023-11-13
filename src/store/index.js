import { configureStore } from "@reduxjs/toolkit";
import { boardsSlice } from "./boards";

export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
});
