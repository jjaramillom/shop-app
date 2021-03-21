import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/store/reducers/products';
import { RootState } from '@app/store/reducers/root';

const products = (state: RootState) => state.products;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): [Dispatch<any>, State] => {
  const dispatch = useDispatch();
  const selector = useSelector(products);
  return [dispatch, selector];
};
