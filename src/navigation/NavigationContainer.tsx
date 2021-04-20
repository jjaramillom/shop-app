import React, { useEffect, useRef } from 'react';
import { createAppContainer, NavigationActions } from 'react-navigation';

import mainNavigator from './mainNavigator';
import { MainRoutes } from './routes';
import { useReducer } from '@app/hooks';

const Navigators = createAppContainer(mainNavigator);

const NavigationContainer: React.FC<unknown> = () => {
  const { selector } = useReducer();
  const { token } = selector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navRef: any = useRef(null);

  useEffect(() => {
    if (!token) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: MainRoutes.Auth }));
    }
  }, [token]);

  return <Navigators ref={navRef} />;
};

export default NavigationContainer;
