import { userRequest } from "../../helpers/axios/requestMethod";
import { setOrders } from "../orderRedux";

export const fetchOrders = (userId) => async (dispatch) => {
    try {
        const res = await userRequest.get(`/orders/find/${userId}`);
        dispatch(setOrders(res?.data));
        // console.log(res?.data)
    } catch (error) {
        console.error("Failed to fetch orders:", error);
    }
};