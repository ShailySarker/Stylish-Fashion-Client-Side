import { publicRequest } from "../../helpers/axios/requestMethod";
import { loginFailure, loginStart, loginSuccess, logout, signUpFailure, signUpStart, signUpSuccess } from "../userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        localStorage.setItem("user", JSON.stringify(res?.data)); // Save user info to localStorage
        dispatch(loginSuccess(res?.data));
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed";
        console.error('Login Error:', errorMsg);
        dispatch(loginFailure(errorMsg));
    }
};

export const signUp = async (dispatch, user) => {
    dispatch(signUpStart());
    try {
        const res = await publicRequest.post("/auth/signUp", user);
        localStorage.setItem("user", JSON.stringify(res?.data)); // Save user info to localStorage
        dispatch(signUpSuccess(res?.data));
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Sign up failed";
        console.error('Sign up failed:', errorMsg);
        dispatch(signUpFailure(errorMsg));
    }
};

export const logOut = (dispatch) => {
    localStorage.removeItem("user"); // Remove user info from localStorage
    dispatch(logout());
};