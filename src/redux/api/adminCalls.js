import { userRequest } from "../../helpers/axios/requestMethod";
import {
    getProductStart, getProductSuccess, getProductFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure
} from "../productRedux";
import { setOrdersLoading, setOrders, setOrdersError, updateOrder } from "../orderRedux";

// --- USER MANAGEMENT ---
export const fetchUsersWithOrders = async () => {
    try {
        const response = await userRequest.get("/users/users-with-orders");
        return response?.data;
    } catch (error) {
        console.error("Error fetching users with orders:", error);
        throw error;
    }
};

export const fetchUserWithOrders = async (userId) => {
    try {
        const response = await userRequest.get(`/users/user-with-orders/${userId}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// --- PRODUCT MANAGEMENT ---
export const fetchAllProducts = () => async (dispatch) => {
    dispatch(getProductStart());
    try {
        const response = await userRequest.get("/products");
        dispatch(getProductSuccess(response?.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
};

export const deleteAdminProduct = (id) => async (dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
        return { success: true };
    } catch (error) {
        dispatch(deleteProductFailure());
        return { success: false, error };
    }
};

export const createAdminProduct = (productData) => async (dispatch) => {
    dispatch(addProductStart());
    try {
        const response = await userRequest.post('/products', productData);
        dispatch(addProductSuccess(response?.data));
        return { success: true, data: response?.data };
    } catch (error) {
        dispatch(addProductFailure());
        return { success: false, error };
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await userRequest.get(`/products/find/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching product by id:", error);
        throw error;
    }
};

export const updateAdminProduct = (id, productData) => async (dispatch) => {
    dispatch(updateProductStart());
    try {
        const response = await userRequest.put(`/products/${id}`, productData);
        dispatch(updateProductSuccess({ id, product: response?.data }));
        return { success: true, data: response?.data };
    } catch (error) {
        dispatch(updateProductFailure());
        console.error("Error updating product:", error);
        return { success: false, error };
    }
};

// --- TRANSACTION MANAGEMENT ---
export const fetchAllOrders = () => async (dispatch) => {
    dispatch(setOrdersLoading());
    try {
        const response = await userRequest.get("/orders");
        dispatch(setOrders(response?.data));
    } catch (error) {
        dispatch(setOrdersError(error.message));
    }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
        const response = await userRequest.put(`/orders/${orderId}`, { status });
        dispatch(updateOrder(response?.data));
    } catch (error) {
        console.error("Error updating order:", error);
    }
};
