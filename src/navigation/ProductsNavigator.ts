import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { Route } from './index';
import { ProductsRoutes } from './routes';
import colors from '@app/constants/colors';
import ProductDetailScreen from '@app/screens/shop/ProductDetailScreen';
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
  },
  ProductDetails: {
    screen: ProductDetailScreen,
  },
};

export default createStackNavigator(routesMap, { defaultNavigationOptions });
