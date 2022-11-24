import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "api/categories/get",
      providesTags: ["categories"],
    }),

    //get labels
    getLabels: builder.query({
      query: () => "api/transactions/labels",
      providesTags: ["transaction"],
    }),

    //post transactions
    addTransactions: builder.mutation({
      query: (initialTransaction) => ({
        url: "api/transactions/post",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:8080/api/transaction'
        url: "/api/transactions",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
