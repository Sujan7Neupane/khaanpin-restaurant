// store/superadminSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for superadmin
const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: "",
};

const superadminSlice = createSlice({
  name: "superadmin",
  initialState,
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

export const { login, logout, setAuthState, setLoading } =
  superadminSlice.actions;
export default superadminSlice.reducer;
