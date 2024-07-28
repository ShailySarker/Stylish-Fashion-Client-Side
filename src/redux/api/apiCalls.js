import { publicRequest } from "../../helpers/axios/requestMethod";
import { loginFailure, loginStart, loginSuccess, signUpFailure, signUpStart, signUpSuccess } from "../userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res?.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const signUp = async (dispatch, user) => {
    dispatch(signUpStart());
    try {
        const res = await publicRequest.post("/auth/signUp", user);
        dispatch(signUpSuccess(res?.data));
    } catch (error) {
        dispatch(signUpFailure());
    }
};