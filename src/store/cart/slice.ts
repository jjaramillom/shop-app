import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import CartItem from '@app/models/CartItem';
import Product from '@app/models/Product';

interface State {
  items: Record<string, CartItem>;
  totalPrice: number;
}

interface AddPayload {
  product: Product;
}

interface RemovePayload {
  productId: string;
}

const initialState: State = {
  items: {},
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<AddPayload>) => {
      const { id, title, price } = payload.product;
      const isNewItem = !state.items[id];
      if (isNewItem) {
        state.items[id] = {
          title,
          price,
          quantity: 1,
        };
      } else {
        state.items[id].quantity += 1;
      }
      state.totalPrice += price;
    },
    remove: (state, { payload }: PayloadAction<RemovePayload>) => {
      const { productId } = payload;
      const productToRemove = state.items[productId];
      if (!productToRemove) {
        return;
      } else if (productToRemove.quantity === 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [productId]: omit, ...newItems } = state.items;
        state.items = newItems;
      } else {
        state.items[productId].quantity -= 1;
      }
      state.totalPrice -= productToRemove.price;
    },
  },
});

export const { add: addProduct, remove: removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
