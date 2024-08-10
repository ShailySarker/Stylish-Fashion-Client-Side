// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         cartQuantity: 0,
//         total: 0
//     },
//     reducers: {


//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.productQuantity;
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.productQuantity;
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//         }
//     }
// });


// export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// // // addProduct: (state, action) => {
//         //     state.cartQuantity += 1;
//         //     state.products.push(action.payload);
//         //     state.total += action.payload.price * action.payload.productQuantity;
//         // },
//         // deleteProduct: (state, action) => {
//         //     const productId = action.payload.id;
//         //     const productIndex = state.products.findIndex(p => p._id === productId);

//         //     if (productIndex !== -1) {
//         //         const product = state.products[productIndex];
//         //         state.cartQuantity -= 1;
//         //         state.total -= product.price * product.productQuantity;
//         //         state.products.splice(productIndex, 1);
//         //     }
//         // }
//         // combine
//         // addProduct: (state, action) => {
//         //     const existingProduct = state.products.find(product => product._id === action.payload._id);
//         //     if (existingProduct) {
//         //         existingProduct.productQuantity += action.payload.productQuantity;
//         //     } else {
//         //         state.products.push(action.payload);
//         //         state.cartQuantity += 1;
//         //     }
//         //     state.total += action.payload.price * action.payload.productQuantity;
//         // },
//         // deleteProduct: (state, action) => {
//         //     const productId = action.payload.id;
//         //     const productIndex = state.products.findIndex(p => p._id === productId);

//         //     if (productIndex !== -1) {
//         //         const product = state.products[productIndex];
//         //         if (product.productQuantity > 1) {
//         //             product.productQuantity -= 1;
//         //             state.total -= product.price;
//         //         } else {
//         //             state.products.splice(productIndex, 1);
//         //             state.cartQuantity -= 1;
//         //             state.total -= product.price;
//         //         }
//         //     }
//         // }
//         // unique id



// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         cartQuantity: 0,
//         total: 0
//     },
//     reducers: {
//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.productQuantity;
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.productQuantity;
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//         }
//     }
// });

// export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


//////////////////////////////////////////////

// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// // Helper function to load cart state from localStorage
// const loadCartState = () => {
//     try {
//         const serializedState = localStorage.getItem("cart");
//         return serializedState ? JSON.parse(serializedState) : undefined;
//     } catch (error) {
//         console.error("Could not load cart state from localStorage", error);
//         return undefined;
//     }
// };

// // Helper function to save cart state to localStorage
// const saveCartState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem("cart", serializedState);
//     } catch (error) {
//         console.error("Could not save cart state to localStorage", error);
//     }
// };

// const initialState = loadCartState() || {
//     products: [],
//     cartQuantity: 0,
//     total: 0
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.productQuantity;
//             saveCartState(state);
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.productQuantity;
//                 saveCartState(state);
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//             saveCartState(state);
//         }
//     }
// });

// export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


////////////////////////////////
// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// // Helper function to load cart state from localStorage
// const loadCartState = (userId) => {
//     try {
//         const serializedState = localStorage.getItem(`cart_${userId}`);
//         return serializedState ? JSON.parse(serializedState) : undefined;
//     } catch (error) {
//         console.error("Could not load cart state from localStorage", error);
//         return undefined;
//     }
// };

// // Helper function to save cart state to localStorage
// const saveCartState = (userId, state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem(`cart_${userId}`, serializedState);
//     } catch (error) {
//         console.error("Could not save cart state to localStorage", error);
//     }
// };

// const initialState = {
//     products: [],
//     cartQuantity: 0,
//     total: 0
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         setUserCart: (state, action) => {
//             const userId = action.payload.userId;
//             const userCart = loadCartState(userId) || initialState;
//             return userCart;
//         },
//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.productQuantity;
//             saveCartState(action.payload.userId, state);
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.productQuantity;
//                 saveCartState(action.payload.userId, state);
//             }
//         },
//         clearCart: (state, action) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//             saveCartState(action.payload.userId, state);
//         }
//     }
// });

// export const { setUserCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

/////////////////////////////////////////////
// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         cartQuantity: 0,
//         total: 0
//     },
//     reducers: {
//         setCart: (state, action) => {
//             state.products = action.payload.products;
//             state.cartQuantity = action.payload.cartQuantity;
//             state.total = action.payload.total;
//         },
//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() }; // generate unique id
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.productQuantity;
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p?.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.productQuantity;
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//         }
//     }
// });

// export const { setCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

/////////////////////////////////////////////////////////////////
//new
// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         cartQuantity: 0,
//         total: 0,
//     },
//     reducers: {
//         addProduct: (state, action) => {
//             const newProduct = { ...action.payload, cartItemId: uuidv4() };
//             state.products.push(newProduct);
//             state.cartQuantity += 1;
//             state.total += action.payload.price * action.payload.quantity;
//         },
//         deleteProduct: (state, action) => {
//             const cartItemId = action.payload.cartItemId;
//             const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

//             if (productIndex !== -1) {
//                 const product = state.products[productIndex];
//                 state.products.splice(productIndex, 1);
//                 state.cartQuantity -= 1;
//                 state.total -= product.price * product.quantity;
//             }
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.cartQuantity = 0;
//             state.total = 0;
//         },
//         setCart: (state, action) => {
//             state.products = action.payload.products;
//             state.cartQuantity = action.payload.products.length;
//             state.total = action.payload.products.reduce((total, product) => total + product.price * product.quantity, 0);
//         },
//     },
// });

// export const { addProduct, deleteProduct, clearCart, setCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
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
            const productIndex = state.products.findIndex(p => p.cartItemId === cartItemId);

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
        },
        setCart: (state, action) => {
            state.products = action.payload.products;
            state.cartQuantity = action.payload.products.length;
            state.subTotal = action.payload.products.reduce((total, product) => total + product.total, 0);
        },
    },
});

export const { setCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


