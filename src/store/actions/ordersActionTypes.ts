export const ADD_ORDER = 'ADD_ORDER';
import CartItem from '@app/models/CartItem';

export interface AddOrder {
  type: typeof ADD_ORDER;
  payload: { items: CartItem[] };
}

export type ActionTypes = AddOrder;

export type Action = 'ADD_ORDER';
