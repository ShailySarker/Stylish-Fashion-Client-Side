import { userRequest } from "../../helpers/axios/requestMethod";
import { setCart } from "../cartRedux";

// cart product show
export const fetchCart = (userId) => async (dispatch) => {
    try {
        const res = await userRequest.get(`/carts/find/${userId}`);
        dispatch(setCart(res?.data));
    } catch (error) {
        console.error("Failed to fetch cart:", error);
    }
};

// cart product delete
export const deleteProductFromCart = (userId, cartItemId) => async (dispatch) => {
    try {
        // Sending DELETE request to the backend API
        const res = await userRequest.delete(`/carts/delete/${userId}/${cartItemId}`);

        // After successful deletion, update the cart state in Redux
        dispatch(setCart(res?.data));
    } catch (error) {
        console.error("Failed to delete product from cart:", error);
    }
};
