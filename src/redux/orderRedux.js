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
    },
});

export const { setOrders, clearOrders, setOrdersLoading, setOrdersError } = orderSlice.actions;
export default orderSlice.reducer;
