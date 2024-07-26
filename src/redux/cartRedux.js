import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.cartQuantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.productQuantity;
        },
        deleteProduct: (state, action) => {
            const productId = action.payload.id;
            const product = state.products.find(p => p.id === productId);

            if (product) {
                state.cartQuantity -= 1;
                state.total -= product.price * product.productQuantity;

                state.products = state.products.filter(p => p.id !== productId);
            }
        }
    }
});


export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;