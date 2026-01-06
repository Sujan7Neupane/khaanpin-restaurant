import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // initially value inside cart is 0/empty
    cartData: [], //cart.carData for cartData(data inside cart)
    cartId: null, //clear cart after user logs out
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // this reducers will add the item to the object items
    setCart: (state, action) => {
      const { cartData, totalPrice, _id } = action.payload;
      state.cartData = cartData;
      state.totalPrice = totalPrice;
      state.cartId = _id ?? null;
    },

    // this reducers will remove the item to the object items
    // removeFromCart: (state, action) => {
    //   state.cartData = [];
    //   state.totalPrice = 0;
    // },

    clearCart(state) {
      state.cartData = [];
      state.totalPrice = 0;
      state.cartId = null;
      state.error = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCart, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
