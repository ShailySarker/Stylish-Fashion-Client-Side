import { userRequest } from "../../helpers/axios/requestMethod";
import { setCart } from "../cartRedux";

export const fetchCart = (userId) => async (dispatch) => {
    try {
        const res = await userRequest.get(`/carts/find/${userId}`);
        dispatch(setCart(res?.data));
    } catch (error) {
        console.error("Failed to fetch cart:", error);
    }
};
