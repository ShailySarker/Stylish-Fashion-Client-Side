import Swal from "sweetalert2";
import { userRequest } from "../../helpers/axios/requestMethod";
import { clearCart, setCart } from "../cartRedux";

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

// delete all products from the cart
export const deleteAllProductsFromCart = async (userId) => {
    try {
        // Sending DELETE request to the backend API
        await userRequest.delete(`/carts/${userId}`);
        console.log("All cart products deleted successfully");

        // // Clear the cart state in Redux
        // dispatch(clearCart());
    } catch (error) {
        console.error("Failed to delete all products from cart:", error);
    }
};
