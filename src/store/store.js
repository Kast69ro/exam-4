import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../reducers/category-slice";
import { todoCategorySlice } from "../reducers/todo-category-slice";
import { classicCategorySlice } from "../reducers/classic-category-slice";
import { classicTodoSlice } from "../reducers/classic-todo-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todolistApi } from "../api/todolist";
import { categoryTodoApi} from "../api/category-todo";
export const store = configureStore({
  
  reducer: {
    category: categorySlice.reducer,
    todoCategorySlice: todoCategorySlice.reducer,
    classicCategories: classicCategorySlice.reducer,
    classicTodo: classicTodoSlice.reducer,
    [todolistApi.reducerPath]: todolistApi.reducer,
    [categoryTodoApi.reducerPath]: categoryTodoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todolistApi.middleware)
      .concat(categoryTodoApi.middleware),
});

setupListeners(store.dispatch);

