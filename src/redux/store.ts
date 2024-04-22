import { configureStore } from "@reduxjs/toolkit";
import { orderAPI } from "./api/orderAPI";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { dashboardAPI } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  // middleware: (mid) => mid().concat(userAPI.middleware),
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderAPI.middleware,
    dashboardAPI.middleware,
  ], //ignore this error
  
});

export type RootState = ReturnType<typeof store.getState>;