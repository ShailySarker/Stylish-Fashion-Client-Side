import { createSlice } from "@reduxjs/toolkit";

// const wishlistSlice = createSlice({
//     name: "wishlist",
//     initialState: {
//         wishlist: [], // Initial empty array
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         setWishlist: (state, action) => {
//             state.wishlist = action.payload; // This should update the wishlist state
//             state.isLoading = false;
//         },
//         addProductToWishlist: (state, action) => {
//             state.wishlist.push(action.payload); // Adding the new product to the wishlist state
//             state.isLoading = false;
//         },
//         setLoading: (state) => {
//             state.isLoading = true;
//         },
//         setError: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//     },
// });

// const wishlistSlice = createSlice({
//     name: "wishlist",
//     initialState: {
//         wishlist: [],
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         setWishlist: (state, action) => {
//             state.wishlist = action.payload;
//             state.isLoading = false;
//         },
//         addProductToWishlist: (state, action) => {
//             if (Array.isArray(state.wishlist)) {
//                 const productExists = state.wishlist.some(item => item?.selectedProductId === action.payload.selectedProductId);
//                 if (!productExists) {
//                     state.wishlist.push(action.payload);
//                 }
//             }
//             state.isLoading = false;
//         },
//         removeProductFromWishlist: (state, action) => {
//             state.wishlist = state.wishlist.filter(item => item?.selectedProductId !== action.payload);
//             state.isLoading = false;
//         },
//         // addProductToWishlist: (state, action) => {
//         //     const productExists = state.wishlist.some(item => item.selectedProductId === action.payload.selectedProductId);
//         //     if (!productExists) {
//         //         state.wishlist.push(action.payload);
//         //     }
//         //     state.isLoading = false;
//         // },
//         setLoading: (state) => {
//             state.isLoading = true;
//         },
//         setError: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//     },
// });

// export const { setWishlist, addProductToWishlist, removeProductFromWishlist, setLoading, setError } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setWishlistLoading: (state) => {
            state.isLoading = true;  // Start loading when fetch begins
        },
        setWishlistError: (state, action) => {
            state.isLoading = false; // Stop loading on error
            state.error = action.payload;  // Store the error message
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
            state.isLoading = false;  // Stop loading after data is set
            state.error = null;       // Clear any previous errors
        },
        addProductToWishlist: (state, action) => {
            if (Array.isArray(state.wishlist)) {
                const productExists = state.wishlist.some(item => item?.selectedProductId === action.payload.selectedProductId);
                if (!productExists) {
                    state.wishlist.push(action.payload);
                }
            }
            state.isLoading = false;
            state.error = null;
        },
        removeProductFromWishlistLoading: (state) => {
            state.isLoading = true;  // Start loading when fetch begins
        },
        removeProductFromWishlistError: (state, action) => {
            state.isLoading = false; // Stop loading on error
            state.error = action.payload;  // Store the error message
        },
        removeProductFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item?.selectedProductId !== action.payload);
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;  // Start loading when fetch begins
        },
        setError: (state, action) => {
            state.isLoading = false; // Stop loading on error
            state.error = action.payload;  // Store the error message
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        },
    },
});

export const { setWishlistLoading, setWishlistError, setWishlist, clearWishlist, addProductToWishlist, removeProductFromWishlist, removeProductFromWishlistLoading, removeProductFromWishlistError, setLoading, setError } = wishlistSlice.actions;
export default wishlistSlice.reducer;

