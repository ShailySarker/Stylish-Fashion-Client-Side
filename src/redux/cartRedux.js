import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0,
        total: 0
    },
    reducers: {
        
        // addProduct: (state, action) => {
        //     state.cartQuantity += 1;
        //     state.products.push(action.payload);
        //     state.total += action.payload.price * action.payload.productQuantity;
        // },
        // deleteProduct: (state, action) => {
        //     const productId = action.payload.id;
        //     const productIndex = state.products.findIndex(p => p._id === productId);

        //     if (productIndex !== -1) {
        //         const product = state.products[productIndex];
        //         state.cartQuantity -= 1;
        //         state.total -= product.price * product.productQuantity;
        //         state.products.splice(productIndex, 1);
        //     }
        // }
        // combine
        // addProduct: (state, action) => {
        //     const existingProduct = state.products.find(product => product._id === action.payload._id);
        //     if (existingProduct) {
        //         existingProduct.productQuantity += action.payload.productQuantity;
        //     } else {
        //         state.products.push(action.payload);
        //         state.cartQuantity += 1;
        //     }
        //     state.total += action.payload.price * action.payload.productQuantity;
        // },
        // deleteProduct: (state, action) => {
        //     const productId = action.payload.id;
        //     const productIndex = state.products.findIndex(p => p._id === productId);

        //     if (productIndex !== -1) {
        //         const product = state.products[productIndex];
        //         if (product.productQuantity > 1) {
        //             product.productQuantity -= 1;
        //             state.total -= product.price;
        //         } else {
        //             state.products.splice(productIndex, 1);
        //             state.cartQuantity -= 1;
        //             state.total -= product.price;
        //         }
        //     }
        // }
        // unique id
        
        addProduct: (state, action) => {
            const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
            state.products.push(newProduct);
            state.cartQuantity += 1;
            state.total += action.payload.price * action.payload.productQuantity;
        },
        deleteProduct: (state, action) => {
            const cartItemId = action.payload.cartItemId;
            const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

            if (productIndex !== -1) {
                const product = state.products[productIndex];
                state.products.splice(productIndex, 1);
                state.cartQuantity -= 1;
                state.total -= product.price * product.productQuantity;
            }
        }
    }
});


export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;