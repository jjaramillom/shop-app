import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Navigator from './src/navigation';
import { rootReducer } from './src/store/reducers/root';

const store = createStore(rootReducer);

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

export default function App(): JSX.Element {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
