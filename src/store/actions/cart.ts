import { ActionTypes, ADD_TO_CART } from './cartActionTypes';
import Product from '@app/models/Product';

export const addToCart = (product: Product): ActionTypes => ({
  type: ADD_TO_CART,
  payload: { product },
});
