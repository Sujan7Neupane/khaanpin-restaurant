import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import dishReducer from "../store/dishSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    dish: dishReducer,
  },
});
