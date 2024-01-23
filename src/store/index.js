import { configureStore } from "@reduxjs/toolkit";
import { boardsSlice } from "./boards";
import api from "../api";

export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});