import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
      id: null,
      token: null,
      email: null,
      role: 'User',
      isAuth: false
			// id: '2',
			// name: 'User',
			// email: 'user@email.com',
			// phone: '+38 (787) 878 78 99',
			// soc: [],
      // role: 'Shop'
		},
    socList: []
  },
  reducers: {
    getUser(state, action) {
      //state.user = action.payload;
    },
    setUser(state, action) {
      state.user.id = action.payload.id;
      state.user.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.isAuth = !!action.payload.email;
    },
    getSoc(state, action) {
      state.socList = action.payload
    } 
  },
});

export default userSlice.reducer;
export const { getUser, getSoc, setUser, removeUser } = userSlice.actions;
