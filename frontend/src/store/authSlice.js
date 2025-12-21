import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    logout: (state) => {},
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
