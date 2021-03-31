import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionTypes } from '@app/store/actions/cartActionTypes';
import { State } from '@app/store/reducers/cart';
import { RootState } from '@app/store/store';

const cartItems = (state: RootState) => state.cartItems;

export default (): [Dispatch<ActionTypes>, State] => {
  const dispatch = useDispatch();
  const selector = useSelector(cartItems);
  return [dispatch, selector];
};
