import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishes: [], // all dishes from backend
  loading: false,
  error: null, // error message if fetch fails
};

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    // for checking the loading state
    fetchDishStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // stores dishList in dishes:[] array
    fetchDishSuccess: (state, action) => {
      state.dishes = action.payload;
      state.loading = false;
    },
    // for any errors while fetching dishList
    fetchDishError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchDishStart, fetchDishSuccess, fetchDishError } =
  dishSlice.actions;

export default dishSlice.reducer;
