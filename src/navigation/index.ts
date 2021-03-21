import { createAppContainer } from 'react-navigation';

import mainNavigator from './ProductsNavigator';

type NavigationOptions<T, S> = T | ((navigationData: { navigation: S }) => T);
export type Route<T, S> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screen: any;
  navigationOptions?: NavigationOptions<T, S>;
};

export default createAppContainer(mainNavigator);
