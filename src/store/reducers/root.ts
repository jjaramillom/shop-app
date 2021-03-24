import { combineReducers } from 'redux';

import cartReducer from './cart';
import productsReducer from './products';

export const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
