import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionTypes } from '@app/store/actions/ordersActionTypes';
import { State } from '@app/store/reducers/orders';
import { RootState } from '@app/store/reducers/root';

const orders = (state: RootState) => state.orders;

export default (): [Dispatch<ActionTypes>, State] => {
  const dispatch = useDispatch();
  const selector = useSelector(orders);
  return [dispatch, selector];
};
