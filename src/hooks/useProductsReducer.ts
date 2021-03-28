import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ActionTypes } from '@app/store/actions/ordersActionTypes';
import { State } from '@app/store/reducers/products';
import { RootState } from '@app/store/reducers/root';

const products = (state: RootState) => state.products;

export default (): [Dispatch<ActionTypes>, State] => {
  const dispatch = useDispatch();
  const selector = useSelector(products);
  return [dispatch, selector];
};
