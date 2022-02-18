import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {},
    socList: [],
    isAuth: true,
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    getSoc(state, action) {
      state.socList = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { getUser, getSoc } = userSlice.actions;
