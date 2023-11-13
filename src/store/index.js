import { configureStore } from "@reduxjs/toolkit";
import { boardsSlice } from "./boards/reducer";

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
  },
});
