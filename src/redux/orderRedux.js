import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
        },
        setOrdersLoading: (state) => {
            state.isLoading = true;
        },
        setOrdersError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearOrders: (state) => {
            state.orders = [];
        },
        updateOrder: (state, action) => {
            const index = state.orders.findIndex(order => order._id === action.payload._id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
    },
});

export const { setOrders, clearOrders, setOrdersLoading, setOrdersError, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
