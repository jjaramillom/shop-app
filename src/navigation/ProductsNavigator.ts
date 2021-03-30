import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { ProductsRoutes } from './routes';
import { defaultStackNavigationOptions, Route } from './shared';
import CartScreen from '@app/screens/shop/CartScreen';
import ProductDetailScreen from '@app/screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '@app/screens/shop/ProductsOverviewScreen';

type RoutesMap = {
  [key in ProductsRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const routesMap: RoutesMap = {
  ProductsOverview: {
    screen: ProductsOverviewScreen,
  },
  ProductDetails: {
    screen: ProductDetailScreen,
  },
  Cart: {
    screen: CartScreen,
  },
};

export default createStackNavigator(routesMap, { defaultNavigationOptions: defaultStackNavigationOptions });
