import { publicRequest, userRequest } from "../../helpers/axios/requestMethod";
import { clearCart, setCart, setCartStart } from "../cartRedux";
import { clearOrders, setOrders, setOrdersLoading } from "../orderRedux";
import { loginFailure, loginStart, loginSuccess, logout, signUpFailure, signUpStart, signUpSuccess } from "../userRedux"
import { clearWishlist, setWishlist, setWishlistLoading } from "../wishlistRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    // dispatch(setCartStart());
    // dispatch(setWishlistLoading());
    // dispatch(setOrdersLoading());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res?.data));
        // console.log(res?.data)
        // const cartRes = await userRequest.get(`/carts/find/${res?.data?._id}`);
        // dispatch(setCart(cartRes?.data));
        // console.log(cartRes?.data)
        // const wishlistRes = await userRequest.get(`/wishlist/find/${res?.data?._id}`);
        // dispatch(setWishlist(wishlistRes?.data));
        // console.log(wishlistRes?.data)
        // const orderRes = await userRequest.get(`/orders/find/${res?.data?._id}`);
        // dispatch(setOrders(orderRes?.data));
        // console.log(orderRes?.data)
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