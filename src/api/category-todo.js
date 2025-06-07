import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryTodoApi = createApi({
  reducerPath: "categoryTodoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-dos-api.softclub.tj",
  }),
  tagTypes: ["categories"],
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/api/categories?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    addCategory: build.mutation({
      query: (newCategory) => ({
        url: `/api/categories`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: build.mutation({
      query: (category) => ({
        url: `/api/categories`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["categories"],
    }),
     getCategoryById: build.query({
      query: (id) => `/api/categories/${id}`,
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useEditCategoryMutation
} = categoryTodoApi;
