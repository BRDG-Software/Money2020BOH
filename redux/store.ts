import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import authReducer from "./reducer/authReducer";
import { OrderSlice } from "./slices/ordersSlice";
import { ItemsSlice } from "./slices/itemsSlice";

export const store = configureStore({
  reducer: {
    [OrderSlice.reducerPath]: OrderSlice.reducer,
    [ItemsSlice.reducerPath]: ItemsSlice.reducer, 
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
        OrderSlice.middleware,
        ItemsSlice.middleware,
      ]),
});

setupListeners(store.dispatch);
