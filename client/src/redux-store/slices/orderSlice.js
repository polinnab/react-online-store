import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orderList: [],
    historyList: [],
  },
  reducers: {
    getOrders(state, action) {
      state.orderList = action.payload;
    },
    getHistory(state, action) {
      state.historyList = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { getOrders, getHistory } = orderSlice.actions;
