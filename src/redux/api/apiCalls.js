import { publicRequest } from "../../helpers/axios/requestMethod";
import { clearCart, setCart } from "../cartRedux";
import { clearOrders, setOrders } from "../orderRedux";
import { loginFailure, loginStart, loginSuccess, logout, signUpFailure, signUpStart, signUpSuccess } from "../userRedux"
import { clearWishlist, setWishlist } from "../wishlistRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res?.data));
        dispatch(setCart());
        dispatch(setWishlist());
        dispatch(setOrders());
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.message || error?.message));
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
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(clearOrders());
};