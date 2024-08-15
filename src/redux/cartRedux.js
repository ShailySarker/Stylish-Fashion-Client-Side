import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        // cart: JSON.parse(localStorage.getItem('cart')) || [],
        cartQuantity: 0,
        subTotal: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const newProduct = {
                ...action.payload,
                cartItemId: uuidv4(),
                total: action.payload.price * action.payload.productQuantity // Calculate total for each product
            };
            state.products.push(newProduct);
            state.cartQuantity += 1;
            state.subTotal += newProduct.total; // Use the calculated total
        },
        deleteProduct: (state, action) => {
            const cartItemId = action.payload.cartItemId;
            const productIndex = state.products.findIndex(p => p?.cartItemId === cartItemId);

            if (productIndex !== -1) {
                const product = state.products[productIndex];
                state.products.splice(productIndex, 1);
                state.cartQuantity -= 1;
                state.subTotal -= product.total; // Subtract the product's total from subTotal
            }
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
    },
});

export const { setCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


