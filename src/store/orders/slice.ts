import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import CartItem from '@app/models/CartItem';
import Order from '@app/models/Order';

interface State {
  orders: Order[];
}

interface AddPayload {
  items: CartItem[];
}

const initialState: State = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<AddPayload>) => {
      const newOrder = {
        id: new Date().toString(),
        cartItems: payload.items,
        date: new Date(),
        price: payload.items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
      };
      return { ...state, orders: state.orders.concat(newOrder) };
    },
  },
});

export const { add: addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
