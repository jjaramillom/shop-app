import { createSlice } from '@reduxjs/toolkit';

import { PRODUCTS } from '@app/data/dummy-data';
import Product from '@app/models/Product';

interface State {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: State = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p) => p.ownerId === 'u1'),
};

const ordersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

// export const { add: addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
