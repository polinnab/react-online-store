import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        user: {},
        isAuth: false,
        loading: false,
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
        },
        checkAuth(state, action) {
            state.user = action.payload
            state.isAuth = true;
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
});

export default loginSlice.reducer;
export const { registration, login, logout, checkAuth, setLoading, setError } = loginSlice.actions