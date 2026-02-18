import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import filterReducer from './slices/filterSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        filter: filterReducer,
        theme: themeReducer,
    },
});
