import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';
import Product from '@app/models/Product';
import { firebaseUrl } from '@app/shared';

interface State {
  availableProducts: Product[];
  userProducts: Product[];
}

interface DeletePayload {
  id: string;
}

interface CreatePayload {
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
  availableProducts: [],
  userProducts: [],
};

export const createProduct = createAsyncThunk<
  Product | void,
  CreatePayload,
  {
    rejectValue: { errorMessage: string };
  }
>('products/createProduct', async (product, { getState }) => {
  const state = getState() as RootState;
  const productToCreate = { ...product, ownerId: state.auth.userId as string };

  const resp = await fetch(`${firebaseUrl}/products.json?auth=${state.auth.token}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(productToCreate),
  }).then((res) => res.json());
  return { ...productToCreate, id: resp.name };
});

export const editProduct = createAsyncThunk<
  EditPayload | void,
  EditPayload,
  {
    rejectValue: { errorMessage: string };
  }
>('products/editProduct', async ({ id, ...propsToUpdate }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;

    const res = await fetch(`${firebaseUrl}/products/${id}.json?auth=${state.auth.token}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(propsToUpdate),
    });
    if (!res.ok) {
      throw new Error('');
    }
    return { id, ...propsToUpdate };
  } catch (error) {
    rejectWithValue({
      errorMessage: 'Something went wrong!',
    });
  }
});

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id }: DeletePayload): Promise<DeletePayload> => {
    const res = await fetch(`${firebaseUrl}/products/${id}.json`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Something went wrong!');
    }
    return { id };
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }): Promise<{ products: Product[]; userId: string }> => {
    const state = getState() as RootState;
    try {
      const resp = await fetch(`${firebaseUrl}/products.json`, {
        method: 'GET',
      });

      if (!resp.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await resp.json();

      return {
        products: Object.keys(data).map((k) => ({ ...data[k], id: k })),
        userId: state.auth.userId as string,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

const ordersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        const newProduct: Product = { ...action.payload };
        state.userProducts.push(newProduct);
        state.availableProducts.push(newProduct);
        return;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, userId } = action.payload;
        state.availableProducts = products;
        state.userProducts = products.filter((p) => p.ownerId === userId);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        const { id, ...properties } = action.payload;
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
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const itemIndex = state.availableProducts.findIndex((p) => p.id === action.payload.id);
        const userItemIndex = state.userProducts.findIndex((p) => p.id === action.payload.id);
        if (userItemIndex >= 0) {
          state.userProducts.splice(userItemIndex, 1);
        }
        if (itemIndex >= 0) {
          state.availableProducts.splice(itemIndex, 1);
        }
      });
  },
});

export default ordersSlice.reducer;
