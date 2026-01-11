// store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Try to load from localStorage, but also verify with server
const initialState = {
  isLoggedIn: false,
  user: null,
  currency: "$",
  loading: true,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  // here disptched data comes
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setAuthState, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
