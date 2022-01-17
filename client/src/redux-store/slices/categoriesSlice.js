import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState: {
		types: [],
		brands: [],
		colors: [],
  },
  reducers: {
		getTypes(state, action) {
			state.types = [...action.payload]
		},
		getBrands(state, action) {
			state.brands = [...action.payload]
		},
		getColors(state, action) {
			state.colors = [...action.payload]
		},
  },
});

export default categoriesSlice.reducer;
export const { getTypes, getBrands, getColors } = categoriesSlice.actions;
