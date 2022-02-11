import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: [],
    product: {},
    page: 1,
		totalCount: 0,
    limit: 2
  },
  reducers: {
    getProducts(state, action) {
      state.products = [...action.payload];
    }, 
    getProduct(state, action) {
      state.product = {...action.payload};
    },
    setPage(state, action) {
			state.page = action.payload
		},
		setTotalCount(state, action) {
			state.totalCount = action.payload
		}
  },
});

export default productSlice.reducer;
export const { getProducts, getProduct, setPage, setTotalCount } = productSlice.actions;
