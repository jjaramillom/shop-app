import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PRODUCTS } from '@app/data/dummy-data';
import Product from '@app/models/Product';

interface State {
  availableProducts: Product[];
  userProducts: Product[];
}

interface DeletePayload {
  itemId: string;
}

interface AddPayload {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

interface EditPayload {
  id: string;
  title?: string;
  imageUrl?: string;
  description?: string;
}

const initialState: State = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p) => p.ownerId === 'u1'),
};

const ordersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, { payload }: PayloadAction<DeletePayload>) => {
      const itemIndex = state.availableProducts.findIndex((p) => p.id === payload.itemId);
      const userItemIndex = state.userProducts.findIndex((p) => p.id === payload.itemId);
      if (userItemIndex >= 0) {
        state.userProducts.splice(userItemIndex, 1);
      }
      if (itemIndex >= 0) {
        state.availableProducts.splice(itemIndex, 1);
      }
    },
    addProduct: (state, { payload }: PayloadAction<AddPayload>) => {
      const newProduct: Product = { ...payload, id: new Date().toString(), ownerId: 'u1' };
      state.userProducts.push(newProduct);
    },
    editProduct: (state, { payload }: PayloadAction<EditPayload>) => {
      const { id, ...properties } = payload;
      const userItemIndex = state.userProducts.findIndex((p) => p.id === id);
      const itemIndex = state.availableProducts.findIndex((p) => p.id === id);
      if (userItemIndex >= 0) {
        state.userProducts[userItemIndex] = {
          ...state.userProducts[userItemIndex],
          ...properties,
        };
      }
      if (itemIndex >= 0 && userItemIndex >= 0) {
        state.availableProducts[userItemIndex] = {
          ...state.availableProducts[userItemIndex],
          ...properties,
        };
      }
    },
  },
});

export const { deleteProduct, addProduct, editProduct } = ordersSlice.actions;

export default ordersSlice.reducer;
