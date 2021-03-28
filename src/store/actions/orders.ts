import { ActionTypes, ADD_ORDER } from './ordersActionTypes';
import CartItem from '@app/models/CartItem';

export const addOrder = (items: CartItem[]): ActionTypes => ({
  type: ADD_ORDER,
  payload: { items },
});
