import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "",
    category: "all",
    brand: "all",
    gender: "all",
    sortBy: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setBrand: (state, action) => {
            state.brand = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        resetFilters: () => {
            return initialState;
        },
    },
});

export const { setSearchQuery, setCategory, setBrand, setSortBy, setGender, resetFilters } = filterSlice.actions;


export const selectFilters = (state) => state.filter;
export const selectSearchQuery = (state) => state.filter.searchQuery;

export default filterSlice.reducer;
