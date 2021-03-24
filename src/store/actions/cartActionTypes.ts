import Product from '@app/models/Product';

export const ADD_TO_CART = 'ADD_TO_CART';

export interface AddToCart {
  type: typeof ADD_TO_CART;
  payload: { product: Product };
}

export type ActionTypes = AddToCart;

export type Action = 'ADD_TO_CART';
