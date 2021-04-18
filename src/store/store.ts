import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/slice';
import cartReducer from './cart/slice';
import ordersReducer from './orders/slice';
import productsReducer from './products/slice';

const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    orders: ordersReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
