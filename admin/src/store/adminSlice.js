// store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Try to load from localStorage, but also verify with server
const initialState = {
  isLoggedIn: false,
  user: null,
  currency: "$",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  // here disptched data comes
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, setAuthState } = adminSlice.actions;
export default adminSlice.reducer;
