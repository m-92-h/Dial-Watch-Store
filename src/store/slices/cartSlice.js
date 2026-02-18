import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                item.quantity = Math.max(0, quantity);

                if (item.quantity === 0) {
                    state.items = state.items.filter((i) => i.id !== id);
                }
            }
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        setCartOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, setCartOpen } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectIsCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
