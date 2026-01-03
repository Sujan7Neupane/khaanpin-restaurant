import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userToken = action.payload.userToken || "";
    },
    logout: (state) => {
      state.user = null;
      state.userToken = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
