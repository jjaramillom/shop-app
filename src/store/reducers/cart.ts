import { ActionTypes, AddToCart, Action } from '../actions/cartActionTypes';
import CartItem from '@app/models/CartItem';

export type State = {
  items: Record<string, CartItem>;
  totalPrice: number;
};

const initialState: State = {
  items: {},
  totalPrice: 0,
};

const addProduct = (
  state: State,
  {
    payload: {
      product: { id, title, price },
    },
  }: AddToCart
): State => {
  const isNewItem = !state.items[id];
  const quantity = isNewItem ? 1 : state.items[id].quantity + 1;
  const itemToUpdateOrAdd = new CartItem({
    title,
    price,
    quantity,
  });
  return {
    ...state,
    items: { ...state.items, [id]: itemToUpdateOrAdd },
    totalPrice: state.totalPrice + price,
  };
};

const resolversMap: Record<Action, (state: State, action: ActionTypes) => State> = {
  ADD_TO_CART: addProduct,
};

export default (state: State = initialState, action: ActionTypes): State => {
  if (resolversMap[action.type]) {
    return resolversMap[action.type](state, action);
  }
  return state;
};
