import { createSlice } from "@reduxjs/toolkit";

export const classicTodoSlice = createSlice({
  name: "classicTodo",
  initialState: {
    data: null,
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
export default classicTodoSlice.reducer;
export const { setCategories, setCategoriesLoading, setCategoriesError } =
  classicTodoSlice.actions;
