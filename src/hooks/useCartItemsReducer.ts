import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/store/reducers/cart';
import { RootState } from '@app/store/reducers/root';

const cartItems = (state: RootState) => state.cartItems;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): [Dispatch<any>, State] => {
  const dispatch = useDispatch();
  const selector = useSelector(cartItems);
  return [dispatch, selector];
};
