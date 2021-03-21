import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { Route } from './index';
import { ProductsRoutes } from './routeTypes';
import colors from '@app/constants/colors';
import ProductsOverviewScreen from '@app/screens/shop/ProductsOverviewScreen';

type RoutesMap = {
  [key in ProductsRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const defaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: 'white',
};

const routesMap: RoutesMap = {
  ProductsOverview: {
    screen: ProductsOverviewScreen,
    navigationOptions: { headerTitle: 'Meal categories' },
  },
};

export default createStackNavigator(routesMap, { defaultNavigationOptions });
