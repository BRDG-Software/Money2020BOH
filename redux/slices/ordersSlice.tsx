import { OrdersResponse } from "@/app/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderSlice = createApi({
  reducerPath: "OrderSlice",
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
    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders",
      }),
    }),
    getLatestOrders: builder.query<OrdersResponse, number>({
      query: (latest) => ({
        url: `/orders?latest=${latest}`,
      }),
    }),
    getCompletedLatestOrders: builder.query<OrdersResponse, number>({
      query: (latest) => ({
        url: `/orders/status/completed?latest=${latest}`,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/orders/${id}`,
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

export const {
  useGetAllOrdersQuery,
  useGetLatestOrdersQuery,
  useGetCompletedLatestOrdersQuery,
  useUpdateOrderMutation,
  //   useGetOrdersByIdQuery,
  //   useGetOrderByIdQuery,
  //   useAddOrderMutation,
  //   useUpdateOrderMutation,
  //   useDeleteOrderMutation,
  //   useDeleteOrderBulkMutation,
} = OrderSlice;
