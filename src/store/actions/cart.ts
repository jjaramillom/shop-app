import { ActionTypes, ADD_TO_CART, REMOVE_FROM_CART } from './cartActionTypes';
import Product from '@app/models/Product';

export const addToCart = (product: Product): ActionTypes => ({
  type: ADD_TO_CART,
  payload: { product },
});

export const removeFromCart = (productId: string): ActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});
