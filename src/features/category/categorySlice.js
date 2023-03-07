import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  searchQuery: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.searchQuery = "";
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSearchQuery } = categorySlice.actions;

export const category = (state) => state.category.category;
export const searchQuery = (state) => state.category.searchQuery;

export default categorySlice.reducer;
