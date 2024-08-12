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

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
            state.isLoading = false;
        },
        addProductToWishlist: (state, action) => {
            if (Array.isArray(state.wishlist)) {
                const productExists = state.wishlist.some(item => item?.selectedProductId === action.payload.selectedProductId);
                if (!productExists) {
                    state.wishlist.push(action.payload);
                }
            }
            state.isLoading = false;
        },
        // addProductToWishlist: (state, action) => {
        //     const productExists = state.wishlist.some(item => item.selectedProductId === action.payload.selectedProductId);
        //     if (!productExists) {
        //         state.wishlist.push(action.payload);
        //     }
        //     state.isLoading = false;
        // },
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});


export const { setWishlist, addProductToWishlist, setLoading, setError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
