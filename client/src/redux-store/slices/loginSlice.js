import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        user: {},
        isAuth: false,
        error: ''
    },
    reducers: {
        registration(state, action) {
            state.user = action.payload;
            state.isAuth = true;
        },
        login(state, action) {
            state.user = action.payload
            state.isAuth = true;
        },
        logout(state, action) {
            state.user = {};
            state.isAuth = false;
            state.error = ''
        },
        setError(state, action) {
            state.error = action.payload
        },
        editUser(state, action) {
            state.user = action.payload
        }
    }
});

export default loginSlice.reducer;
export const { registration, login, logout, setError, editUser } = loginSlice.actions