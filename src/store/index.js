import { configureStore } from "@reduxjs/toolkit";
import { boardsSlice } from "./boards";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    user: userSlice.reducer,
  },
});
