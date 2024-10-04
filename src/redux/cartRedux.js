// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         // cart: JSON.parse(localStorage.getItem('cart')) || [],
//         cartQuantity: 0,
//         subTotal: 0,
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         addProduct: (state, action) => {
//             const newProduct = {
//                 ...action.payload,
//                 cartItemId: uuidv4(),
//                 total: action.payload.price * action.payload.productQuantity // Calculate total for each product
//             };
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.subTotal += newProduct.total; // Use the calculated total
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p?.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.subTotal -= product.total; // Subtract the product's total from subTotal
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.subTotal = 0;
//             // localStorage.removeItem('cart');
//         },
//         setCart: (state, action) => {
//             state.products = action.payload.products;
//             state.cartQuantity = action.payload.products.length;
//             state.subTotal = action.payload.products.reduce((total, product) => total + product?.total, 0);
//         },
//     },
// });

// export const { setCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0,
        subTotal: 0,
        isLoading: false,
        error: null,
    },
    reducers: {
        // Set loading state when adding a product
        addProductStart: (state) => {
            state.isLoading = true;
            state.error = null; // Reset error when a new action starts
        },
        addProductSuccess: (state, action) => {
            const newProduct = {
                ...action.payload,
                cartItemId: uuidv4(),
                total: action.payload.price * action.payload.productQuantity // Calculate total for each product
            };
            state.products.push(newProduct);
            state.cartQuantity += 1;
            state.subTotal += newProduct.total; // Use the calculated total
            state.isLoading = false; // Set loading to false on success
        },
        addProductFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Set the error message from the action
        },

        // Delete product actions with loading/error states
        deleteProductStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteProductSuccess: (state, action) => {
            const cartItemId = action.payload.cartItemId;
            const productIndex = state.products.findIndex(p => p?.cartItemId === cartItemId);

            if (productIndex !== -1) {
                const product = state.products[productIndex];
                state.products.splice(productIndex, 1);
                state.cartQuantity -= 1;
                state.subTotal -= product.total; // Subtract the product's total from subTotal
            }
            state.isLoading = false; // Set loading to false after success
        },
        deleteProductFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearCart: (state) => {
            state.products = [];
            state.cartQuantity = 0;
            state.subTotal = 0;
            // localStorage.removeItem('cart');
        },
        setCart: (state, action) => {
            state.products = action.payload.products;
            state.cartQuantity = action.payload.products.length;
            state.subTotal = action.payload.products.reduce((total, product) => total + product?.total, 0);
        },
        // // Clear cart actions
        // clearCartStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // clearCartSuccess: (state) => {
        //     state.products = [];
        //     state.cartQuantity = 0;
        //     state.subTotal = 0;
        //     state.isLoading = false;
        // },
        // clearCartFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },

        // // Set cart actions
        // setCartStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // setCartSuccess: (state, action) => {
        //     state.products = action.payload.products;
        //     state.cartQuantity = action.payload.products.length;
        //     state.subTotal = action.payload.products.reduce((total, product) => total + product?.total, 0);
        //     state.isLoading = false;
        // },
        // setCartFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    },
});

export const {
    addProductStart, addProductSuccess, addProductFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    clearCart, setCart
    // clearCartStart, clearCartSuccess, clearCartFailure,
    // setCartStart, setCartSuccess, setCartFailure
} = cartSlice.actions;

export default cartSlice.reducer;
