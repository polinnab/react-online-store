import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    products: []
  },
  reducers: {
    getCart(state, action) {
      state.products = [...action.payload];
    }
  },
});

export default cartSlice.reducer;
export const { getCart, setLoading } = cartSlice.actions;
