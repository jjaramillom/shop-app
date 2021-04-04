import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { AdminRoutes } from './routes';
import { defaultStackNavigationOptions, Route } from './shared';
import EditProductScreen from '@app/screens/user/EditProductScreen';
import UserProductsScreen from '@app/screens/user/UserProductsScreen';

type RoutesMap = {
  [key in AdminRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const routesMap: RoutesMap = {
  UserProducts: {
    screen: UserProductsScreen,
  },
  EditProduct: {
    screen: EditProductScreen,
  },
};

export default createStackNavigator(routesMap, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});
