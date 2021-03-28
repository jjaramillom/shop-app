import { combineReducers } from 'redux';

import cartReducer from './cart';
import ordersReducer from './orders';
import productsReducer from './products';

export const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
