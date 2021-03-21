import { PRODUCTS } from '@app/data/dummy-data';
import Product from '@app/models/Product';

export type State = {
  availableProducts: Product[];
  userProducts: Product[];
};

const initialState: State = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p) => p.ownerId === 'u1'),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: State = initialState, action: any): State => {
  return state;
};
