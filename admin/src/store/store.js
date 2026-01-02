import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice.js";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
