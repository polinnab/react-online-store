import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
			id: '',
			name: '',
			email: '',
			fav: [],
			cart: []
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
