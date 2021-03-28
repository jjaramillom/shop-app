import { ActionTypes, AddToCart, RemoveFromCart, Action } from '../actions/cartActionTypes';
import { ReducerResolver } from './types';
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

const removeProduct = (state: State, { payload: { productId } }: RemoveFromCart): State => {
  const productToRemove = state.items[productId];
  if (!productToRemove) {
    return state;
  } else if (productToRemove.quantity === 1) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [productId]: omit, ...newItems } = state.items;
    return { ...state, items: newItems, totalPrice: state.totalPrice - productToRemove.price };
  }
  const newProduct = new CartItem({
    title: productToRemove.title,
    price: productToRemove.price,
    quantity: productToRemove.quantity - 1,
  });
  return {
    ...state,
    items: {
      ...state.items,
      [productId]: newProduct,
    },
    totalPrice: state.totalPrice - productToRemove.price,
  };
};

const resolversMap: Record<Action, ReducerResolver<State, ActionTypes>> = {
  ADD_TO_CART: (state: State, action): State => addProduct(state, action as AddToCart),
  REMOVE_FROM_CART: (state: State, action): State =>
    removeProduct(state, action as RemoveFromCart),
};

export default (state: State = initialState, action: ActionTypes): State => {
  if (resolversMap[action.type]) {
    return resolversMap[action.type](state, action);
  }
  return state;
};
