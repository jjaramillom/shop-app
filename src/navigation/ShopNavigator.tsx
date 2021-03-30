import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createDrawerNavigator,
  NavigationDrawerOptions,
  NavigationDrawerProp,
} from 'react-navigation-drawer';

import {} from './index';
import OrdersNavigator from './OrdersNavigator';
import ProductsNavigator from './ProductsNavigator';
import { ShopRoutes } from './routes';
import { Route } from './shared';
import { Colors } from '@app/constants';

type RoutesMap = {
  [key in ShopRoutes]: Route<NavigationDrawerOptions, NavigationDrawerProp<unknown>>;
};

const routesMap: RoutesMap = {
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
      ),
    },
  },
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
      ),
    },
  },
};

export default createDrawerNavigator(routesMap, {
  contentOptions: {
    activeTintColor: Colors.accent,
  },
});
