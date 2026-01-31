import { configureStore } from "@reduxjs/toolkit";
import superadminReducer from "./superadminSlice";

export const store = configureStore({
  reducer: {
    superadmin: superadminReducer,
  },
});
