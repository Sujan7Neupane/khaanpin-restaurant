import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // initially value inside cart is 0/empty
    cartData: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // this reducers will add the item to the object items
    setCart: (state, action) => {
      const { cartData, totalPrice } = action.payload;
      state.cartData = cartData;
      state.totalPrice = totalPrice;
    },

    // this reducers will remove the item to the object items
    removeFromCart: (state, action) => {
      state.cartData = [];
      state.totalPrice = 0;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCart, removeFromCart, setLoading, setError } =
  cartSlice.actions;
export default cartSlice.reducer;
