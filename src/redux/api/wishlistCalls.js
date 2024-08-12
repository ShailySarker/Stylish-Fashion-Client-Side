import { userRequest } from "../../helpers/axios/requestMethod";
import { setError, setLoading } from "../orderRedux";
import { addProductToWishlist, removeProductFromWishlist, setWishlist } from "../wishlistRedux";

// export const addToWishlist = (userId, product) => async (dispatch) => {
//     dispatch(setLoading());
//     try {
//         console.log("Dispatching addToWishlist with:", { userId, product });

//         const res = await userRequest.post("/wishlist", {
//             userId,
//             products: [product],
//         });

//         console.log("Response from addToWishlist API:", res?.data);

//         if (res?.status === 200) {
//             dispatch(addProductToWishlist(product));
//             return { status: 'success', data: res?.data };
//         } else {
//             return { status: 'error', message: 'Unexpected response status' };
//         }
//     } catch (error) {
//         console.error("Failed to add product to wishlist:", error);
//         dispatch(setError(error.message));
//         return { status: 'error', message: error.message };
//     }
// };


// add product into wishlist
export const addToWishlist = (userId, product) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await userRequest.post("/wishlist", {
            userId,
            product,
        });

        const { wishlist } = getState().wishlist;

        // // Check if the product is already in the wishlist
        // const productExists = wishlist.some(item => item?.selectedProductId === product?.selectedProductId);
        // if (!productExists) {
        //     dispatch(addProductToWishlist(product)); // Update Redux state with the new product
        // }
        if (Array.isArray(wishlist)) {
            // Check if the product is already in the wishlist
            const productExists = wishlist.some(item => item.selectedProductId === product.selectedProductId);
            if (!productExists) {
                dispatch(addProductToWishlist(product)); // Update Redux state with the new product
            }
        } else {
            // Handle the case where wishlist is not an array
            console.error("Wishlist is not an array:", wishlist);
        }

        console.log("Wishlist updated:", res?.data);

        return { status: 'success', data: res?.data };

    } catch (error) {
        dispatch(setError(error.message));
        console.error("Failed to add product to wishlist:", error);

        return { status: 'error', message: error.message };
    }
};


//get product from wishlist
export const fetchWishlist = (userId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await userRequest.get(`/wishlist/find/${userId}`);
        const wishlist = response?.data?.products || []; // Ensure you are accessing the correct field
        dispatch(setWishlist(wishlist));
        console.log("Fetched wishlist:", wishlist);
    } catch (error) {
        dispatch(setError(error.message));
        console.error("Failed to fetch wishlist:", error);
    }
};

// Remove product from wishlist
export const removeFromWishlist = (userId, productId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await userRequest.delete(`/wishlist/remove/${userId}`, {
            data: { productId }
        });

        // Directly update the Redux state with the updated wishlist
        dispatch(removeProductFromWishlist(productId)); // This updates the wishlist in Redux
        dispatch(setWishlist(res?.data)); // This sets the wishlist from the server response

        console.log("Wishlist updated:", res?.data);
        return { status: 'success', data: res?.data };

    } catch (error) {
        dispatch(setError(error.message));
        console.error("Failed to remove product from wishlist:", error);
        return { status: 'error', message: error.message };
    }
};





// export const fetchWishlist = (userId) => async (dispatch) => {
//     dispatch(setLoading());
//     try {
//         const response = await userRequest.get(`/wishlist/find/${userId}`);
//         dispatch(setWishlist(response?.data));
//         console.log("Fetched wishlist:", response?.data);
//     } catch (error) {
//         dispatch(setError(error.message));
//         console.error("Failed to fetch wishlist:", error);
//     }
// };




