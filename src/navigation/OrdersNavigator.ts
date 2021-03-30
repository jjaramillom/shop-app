import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { OrdersRoutes } from './routes';
import { defaultStackNavigationOptions, Route } from './shared';
import OrdersScreen from '@app/screens/shop/OrdersScreen';

type RoutesMap = {
  [key in OrdersRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const routesMap: RoutesMap = {
  Orders: {
    screen: OrdersScreen,
  },
};

export default createStackNavigator(routesMap, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});
