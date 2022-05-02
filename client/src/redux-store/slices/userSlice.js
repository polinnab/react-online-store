import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
			id: '2',
			login: 'login',
			name: 'User',
			email: 'user@email.com',
			phone: '+38 (787) 878 78 99',
			soc: [],
      role: 'Shop'
		},
    socList: [],
		isAuth: false
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
