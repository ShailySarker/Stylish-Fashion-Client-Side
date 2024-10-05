import { userRequest } from "../../helpers/axios/requestMethod";
import { setOrders, setOrdersError, setOrdersLoading } from "../orderRedux";

export const fetchOrders = (userId) => async (dispatch) => {
    dispatch(setOrdersLoading());
    try {
        const res = await userRequest.get(`/orders/find/${userId}`);
        dispatch(setOrders(res?.data));
        // console.log(res?.data)
    } catch (error) {
        dispatch(setOrdersError());
        console.error("Failed to fetch orders:", error);
    }
};