import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: []
  },
  reducers: {
    getCart(state, action) {
      state.cart = [...action.payload];
    }
  },
});

export default cartSlice.reducer;
export const { getCart } = cartSlice.actions;
