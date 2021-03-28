import Product from '@app/models/Product';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface AddToCart {
  type: typeof ADD_TO_CART;
  payload: { product: Product };
}

export interface RemoveFromCart {
  type: typeof REMOVE_FROM_CART;
  payload: { productId: string };
}

export type ActionTypes = AddToCart | RemoveFromCart;

export type Action = 'ADD_TO_CART' | 'REMOVE_FROM_CART';
