
// import { userRequest } from "../../helpers/axios/requestMethod";
// import { setCart } from "../cartRedux";

// // cart product show
// export const fetchCart = (userId) => async (dispatch) => {
//     try {
//         const res = await userRequest.get(`/carts/find/${userId}`);
//         dispatch(setCart(res?.data));
//         // localStorage.setItem("cart", JSON.stringify(res?.data))
//     } catch (error) {
//         console.error("Failed to fetch cart:", error);
//     }
// };

// // cart product delete
// export const deleteProductFromCart = (userId, cartItemId) => async (dispatch) => {
//     try {
//         // Sending DELETE request to the backend API
//         const res = await userRequest.delete(`/carts/delete/${userId}/${cartItemId}`);

//         // After successful deletion, update the cart state in Redux
//         dispatch(setCart(res?.data));
//     } catch (error) {
//         console.error("Failed to delete product from cart:", error);
//     }
// };

// // delete all products from the cart
// export const deleteAllProductsFromCart = async (userId) => {
//     try {
//         // Sending DELETE request to the backend API
//         await userRequest.delete(`/carts/${userId}`);
//         console.log("All cart products deleted successfully");

//         // // Clear the cart state in Redux
//         // dispatch(clearCart());
//     } catch (error) {
//         console.error("Failed to delete all products from cart:", error);
//     }
// };


import { userRequest } from "../../helpers/axios/requestMethod";
import {
    // setCartStart, setCartSuccess, setCartFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    setCart,
    // clearCartStart, clearCartSuccess, clearCartFailure
} from "../cartRedux";

// Fetch cart products
export const fetchCart = (userId) => async (dispatch) => {
    // dispatch(setCartStart()); // Start loading

    try {
        const res = await userRequest.get(`/carts/find/${userId}`);
        dispatch(setCart(res?.data)); // Dispatch success with cart data
        // dispatch(setCartSuccess(res?.data)); // Dispatch success with cart data
        // localStorage.setItem("cart", JSON.stringify(res?.data))
    } catch (error) {
        console.error("Failed to fetch cart:", error);
        // dispatch(setCartFailure("Failed to fetch cart")); // Dispatch failure with error message
    }
};

// Delete a product from the cart
export const deleteProductFromCart = (userId, cartItemId) => async (dispatch) => {
    dispatch(deleteProductStart()); // Start loading for delete operation

    try {
        // Sending DELETE request to the backend API
        const res = await userRequest.delete(`/carts/delete/${userId}/${cartItemId}`);

        // After successful deletion, update the cart state in Redux
        dispatch(deleteProductSuccess(res?.data)); // Dispatch success with updated cart data
        dispatch(setCart(res?.data))
        // dispatch(setCartSuccess(res?.data))
    } catch (error) {
        console.error("Failed to delete product from cart:", error);
        dispatch(deleteProductFailure("Failed to delete product from cart")); // Dispatch failure with error message
    }
};

// Delete all products from the cart
export const deleteAllProductsFromCart = async (userId) => {
// export const deleteAllProductsFromCart = (userId) => async (dispatch) => {
    // dispatch(clearCartStart()); // Start loading for clearing the cart

    try {
        // Sending DELETE request to the backend API
        await userRequest.delete(`/carts/${userId}`);
        // dispatch(clearCart()); // Clear cart on successful deletion
        // dispatch(clearCartSuccess()); // Clear cart on successful deletion
        console.log("All cart products deleted successfully");
    } catch (error) {
        console.error("Failed to delete all products from cart:", error);
        // dispatch(clearCartFailure("Failed to delete all products from cart")); // Dispatch failure with error message
    }
};
