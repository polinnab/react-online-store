import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orderList: [
      {
        id: 1,
        products: [
          {
            id: 'bf69b9b9-bfeb-4821-8623-cb174f8ff31d',
            name: 'Sneakers 2',
						price: 72,
						count: 2,
						image: 'image-product-1-thumbnail.jpg'
          },
          {
            id: 'bf69b9b9-bfeb-4821-8623-cb174f8ff31d 2',
            name: 'Sneakers 2',
						price: 72,
						count: 2,
						image: 'image-product-1-thumbnail.jpg'
          },
        ],
				clientInfo: {
					id: 1,
					name: 'name',
					phone: '+38 (222) 222 22 22',
					email: 'email@qw.we'
				},
				status: 'В работе'
      },
    ],
    historyList: [],
  },
  reducers: {
    getOrders(state, action) {
      state.orderList = action.payload;
			console.log('action', action.payload);
    },
    getHistory(state, action) {
      state.historyList = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { getOrders, getHistory } = orderSlice.actions;
