import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem('user')) || null,
        isFetching: false,
        error: false,
        signUpError: null,
        loginError: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.loginError = null;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.loginError = action.payload;  // Store login error message here
        },
        signUpStart: (state) => {
            state.isFetching = true;
            state.signUpError = null;
        },
        signUpSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        signUpFailure: (state, action) => {
            state.isFetching = false;
            state.signUpError = action.payload; // Store the error message here

        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('user');
            // localStorage.removeItem('token');
        },
        updateUser(state, action) {
            state.currentUser = action.payload;
        },
    }
});


export const { loginStart, loginSuccess, loginFailure, signUpStart, signUpSuccess, signUpFailure, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;