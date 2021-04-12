import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: CreatePayload): Promise<Product> => {
    const productToCreate = { ...product, ownerId: 'u1' };
    const resp = await fetch(`${firebaseUrl}/products.json`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(productToCreate),
    }).then((res) => res.json());
    return { ...productToCreate, id: resp.name };
  }
);

export const editProduct = createAsyncThunk<
  EditPayload,
  EditPayload,
  {
    rejectValue: { errorMessage: string };
  }
>('products/editProduct', async ({ id, ...propsToUpdate }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${firebaseUrl}/products/${id}.json`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(propsToUpdate),
    });
    if (!res.ok) {
      throw new Error('');
    }
    return { id, ...propsToUpdate };
  } catch (error) {
    return (rejectWithValue({
      errorMessage: 'Something went wrong!',
    }) as unknown) as EditPayload;
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
  async (): Promise<Product[]> => {
    try {
      const resp = await fetch(`${firebaseUrl}/products.json`, {
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
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProduct: Product = { ...action.payload, ownerId: 'u1' };
        state.userProducts.push(newProduct);
        state.availableProducts.push(newProduct);
        return;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.availableProducts = action.payload;
        state.userProducts = action.payload.filter((p) => (p.ownerId = 'u1'));
      })
      .addCase(editProduct.fulfilled, (state, action) => {
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
