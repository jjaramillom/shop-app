import { ActionTypes, AddOrder, Action } from '../actions/ordersActionTypes';
import { ReducerResolver } from './types';
import Order from '@app/models/Order';

export type State = {
  orders: Order[];
};

const initialState: State = {
  orders: [],
};

const addOrder = (state: State, { payload: { items } }: AddOrder): State => {
  const newOrder = new Order({
    id: new Date().toString(),
    cartItems: items,
    date: new Date(),
    price: items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
  });
  return { ...state, orders: state.orders.concat(newOrder) };
};

const resolversMap: Record<Action, ReducerResolver<State, ActionTypes>> = {
  ADD_ORDER: (state: State, action): State => addOrder(state, action as AddOrder),
};

export default (state: State = initialState, action: ActionTypes): State => {
  if (resolversMap[action.type]) {
    return resolversMap[action.type](state, action);
  }
  return state;
};
