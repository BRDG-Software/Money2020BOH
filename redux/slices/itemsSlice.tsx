import { ItemsResponse } from "@/app/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ItemsSlice = createApi({
  reducerPath: "ItemsSlice",
  baseQuery: fetchBaseQuery({
    // prepareHeaders: (headers) => {
    //   const token = getCookie("nurture-token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getAllItems: builder.query<ItemsResponse, void>({
      query: () => ({
        url: "/items",
      }),
    }),
    updateItems: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/items/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    // getOrdersById: builder.query({
    //   query: ({ Id }) => ({
    //     url: "/orders/by-id",
    //     params: {
    //       id: Id,
    //     },
    //   }),
    // }),
    // getOrderById: builder.query({
    //   query: (id) => ({
    //     url: `/orders/${id}`,
    //   }),
    // }),
    // addOrder: builder.mutation({
    //   query: (orderData) => ({
    //     url: "/orders",
    //     method: "POST",
    //     body: orderData,
    //   }),
    // }),
    // deleteOrder: builder.mutation({
    //   query: (id) => ({
    //     url: `/orders/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
    // deleteOrderBulk: builder.mutation({
    //   query: (ids) => ({
    //     url: `/orders/delete/bulk`,
    //     method: "DELETE",
    //     params: {
    //       ids: ids.join(","),
    //     },
    //   }),
    // }),
  }),
});

export const { useGetAllItemsQuery, useUpdateItemsMutation } = ItemsSlice;
