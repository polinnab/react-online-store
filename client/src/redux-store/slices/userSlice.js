import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
			id: '1',
			login: 'login',
			name: 'User',
			email: 'user@email.com',
			phone: '+38 (787) 878 78 99',
			soc: [],
			fav: [],
			cart: [],
      role: 'User'
		},
    socList: [],
		isAuth: true
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    getSoc(state, action) {
      state.socList = action.payload
    } 
  },
});

export default userSlice.reducer;
export const { getUser, getSoc } = userSlice.actions;
