import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todolistApi = createApi({
  reducerPath: "todolistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-dos-api.softclub.tj",
  }),
  tagTypes: ["todos"],
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => "/api/to-dos",
      providesTags: ["todos"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    deleteImage: build.mutation({
      query: (id) => ({
        url: `/api/to-dos/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    addTodo: build.mutation({
      query: (formData) => ({
        url: `/api/to-dos`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["todos"],
    }),
    addImage: build.mutation({
      query: ({ id, formData }) => ({
        url: `/api/to-dos/${id}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["todos"],
    }),
    editTodo: build.mutation({
      query: (todo) => ({
        url: "/api/to-dos",
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});
export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteImageMutation,
  useAddImageMutation
} = todolistApi;
