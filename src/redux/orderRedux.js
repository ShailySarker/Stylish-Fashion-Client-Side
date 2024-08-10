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
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setOrders, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
