import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createDrawerNavigator, NavigationDrawerOptions, NavigationDrawerProp, } from 'react-navigation-drawer';

import AdminNavigator from './adminNavigator';
import OrdersNavigator from './ordersNavigator';
import ProductsNavigator from './productsNavigator';
import { ShopRoutes } from './routes';
import { Route } from './shared';
import { Colors } from '@app/constants';

type RoutesMap = {
  [key in ShopRoutes]: Route<NavigationDrawerOptions, NavigationDrawerProp<unknown>>;
};

const routesMap: RoutesMap = {
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
      ),
    },
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
      ),
    },
  },
  Admin: {
    screen: AdminNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
      ),
    },
  },
};

export default createDrawerNavigator(routesMap, {
  contentOptions: {
    activeTintColor: Colors.accent,
  },
});