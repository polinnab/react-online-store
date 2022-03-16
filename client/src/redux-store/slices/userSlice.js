import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
      id: null,
      token: null,
      email: null,
      role: 'User',
      isAuth: false,
			// id: '2',
			// name: 'User',
			// email: 'user@email.com',
		  phone: null,
			soc: [],
      role: null
		},
    socList: []
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.user.isAuth = !!action.payload.email;
    },
    getSoc(state, action) {
      state.socList = action.payload
    } 
  },
});

export default userSlice.reducer;
export const { getSoc, setUser, removeUser } = userSlice.actions;
