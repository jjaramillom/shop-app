import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { Route } from './index';
import { ProductsRoutes } from './routes';
import { Colors, Fonts } from '@app/constants';
import ProductDetailScreen from '@app/screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '@app/screens/shop/ProductsOverviewScreen';

type RoutesMap = {
  [key in ProductsRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const defaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: Fonts.openSansBold,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.openSansBold,
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
