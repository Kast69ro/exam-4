import { createSlice } from "@reduxjs/toolkit";

export const classicCategorySlice = createSlice({
  name: "classicCategory",
  initialState: {
    data: [],
    loading: false,
    errors: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
    },
    setCategoriesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default classicCategorySlice.reducer;
export const { setCategories, setCategoriesLoading, setCategoriesError } =
  classicCategorySlice.actions;
