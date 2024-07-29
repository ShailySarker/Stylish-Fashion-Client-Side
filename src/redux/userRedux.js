import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        signUpError: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
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
            // state.signUpError = true;
            state.signUpError = action.payload; // Store the error message here

        },
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.signUpError = false;
        },
    }
});


export const { loginStart, loginSuccess, loginFailure, signUpStart, signUpSuccess, signUpFailure, logout } = userSlice.actions;
export default userSlice.reducer;