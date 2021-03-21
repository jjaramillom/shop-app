import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Navigator from './src/navigation';
import { rootReducer } from './src/store/reducers/root';

const store = createStore(rootReducer);

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
