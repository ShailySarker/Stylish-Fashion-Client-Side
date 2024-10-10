import { publicRequest } from "../../helpers/axios/requestMethod";
import { clearCart } from "../cartRedux";
import { clearOrders } from "../orderRedux";
import { loginFailure, loginStart, loginSuccess, logout, signUpFailure, signUpStart, signUpSuccess } from "../userRedux"
import { clearWishlist } from "../wishlistRedux";
import { fetchCart } from "./cartCalls";
import { fetchOrders } from "./orderCalls";
import { fetchWishlist } from "./wishlistCalls";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res?.data));
        // Fetch wishlist, cart and order after login
        // dispatch(fetchWishlist(res?.data?._id));
        // dispatch(fetchCart(res?.data?._id));
        // dispatch(fetchOrders(res?.data?._id));
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
    dispatch(clearWishlist());
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(logout());
};