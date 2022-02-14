import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
			id: '',
			login: 'User',
			name: 'User',
			email: 'user@email.com',
			phone: '78787878',
			soc: [],
			fav: [],
			cart: [],
      role: 'User'
		},
		isAuth: true
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { getUser } = userSlice.actions;
