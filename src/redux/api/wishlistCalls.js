import { userRequest } from "../../helpers/axios/requestMethod";
import { addProductToWishlist, removeProductFromWishlist, removeProductFromWishlistError, removeProductFromWishlistLoading, setError, setLoading, setWishlist, setWishlistError, setWishlistLoading } from "../wishlistRedux";

// add product into wishlist
export const addToWishlist = (product) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await userRequest.post("/wishlist",
            {
                products: product
            }
        );
        const { wishlist } = getState().wishlist;
        if (Array.isArray(wishlist)) {
            // Check if the product is already in the wishlist
            const productExists = wishlist.some(item => item?.selectedProductId === product?.selectedProductId);
            if (!productExists) {
                dispatch(addProductToWishlist(product)); // Update Redux state with the new product
            }
        } else {
            // Handle the case where wishlist is not an array
            console.error("Wishlist is not an array:", wishlist);
        }

        // console.log("Wishlist updated:", res?.data);

        return { status: 'success', data: res?.data };

    } catch (error) {
        dispatch(setError(error?.message));
        console.error("Failed to add product to wishlist:", error);

        return { status: 'error', message: error.message };
    }
};


//get product from wishlist
export const fetchWishlist = (userId) => async (dispatch) => {
    dispatch(setWishlistLoading());
    try {
        const response = await userRequest.get(`/wishlist/find/${userId}`);
        const wishlist = response?.data?.products || []; // Ensure you are accessing the correct field
        dispatch(setWishlist(wishlist));
        return wishlist;  // This is needed for handling in the component
    } catch (error) {
        dispatch(setWishlistError(error?.message));
        console.error("Failed to fetch wishlist:", error);
        throw error;  // Re-throw the error to handle it in the component
    }
};

// Remove product from wishlist
export const removeFromWishlist = (userId, productId) => async (dispatch) => {
    dispatch(removeProductFromWishlistLoading());
    try {
        const res = await userRequest.delete(`/wishlist/remove/${userId}`, {
            data: { productId }
        });

        // Directly update the Redux state with the updated wishlist
        dispatch(removeProductFromWishlist(productId)); // This updates the wishlist in Redux
        console.log("Wishlist updated:", res?.data);
        return { status: 'success', data: res?.data };

    } catch (error) {
        dispatch(removeProductFromWishlistError(error.message));
        console.error("Failed to remove product from wishlist:", error);
        return { status: 'error', message: error.message };
    }
};
