import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: [],
    product: {}
  },
  reducers: {
    getProducts(state, action) {
      state.products = [...action.payload];
    }, 
    getProduct(state, action) {
      state.product = {...action.payload};
    },
  },
});

export default productSlice.reducer;
export const { getProducts, getProduct } = productSlice.actions;
