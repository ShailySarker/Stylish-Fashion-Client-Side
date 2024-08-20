import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartRedux';
import userReducer from './userRedux';
import orderReducer from './orderRedux';
import wishlistReducer from './wishlistRedux';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
    },
});
