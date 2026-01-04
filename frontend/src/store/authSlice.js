import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // for the cookie based login
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // for the cookie based login
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      // for the cookie based login
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
