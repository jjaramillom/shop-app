import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import CartItem from '@app/models/CartItem';
import Order from '@app/models/Order';
import { firebaseUrl } from '@app/shared';

interface State {
  orders: Order[];
}

interface CreatePayload {
  items: CartItem[];
}

const initialState: State = {
  orders: [],
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ items }: CreatePayload): Promise<Order> => {
    const newOrder = {
      id: new Date().toString(),
      cartItems: items,
      date: new Date(),
      price: items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    };
    const resp = await fetch(`${firebaseUrl}/orders.json`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).then((res) => res.json());
    return { ...newOrder, id: resp.name };
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (): Promise<Order[]> => {
    try {
      const resp = await fetch(`${firebaseUrl}/orders.json`, {
        method: 'GET',
      });

      if (!resp.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await resp.json();

      return Object.keys(data).map((k) => ({ ...data[k], id: k }));
    } catch (error) {
      throw new Error(error);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default ordersSlice.reducer;
