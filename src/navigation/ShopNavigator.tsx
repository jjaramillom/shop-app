import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerItems,
  NavigationDrawerOptions,
  NavigationDrawerProp,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import AdminNavigator from './adminNavigator';
import OrdersNavigator from './ordersNavigator';
import ProductsNavigator from './productsNavigator';
import { ShopRoutes, MainRoutes } from './routes';
import { Route } from './shared';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { logout } from '@app/store/auth';

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
  // eslint-disable-next-line react/display-name
  contentComponent: (props: React.PropsWithChildren<DrawerContentComponentProps>) => {
    const { dispatch } = useReducer();
    const handleLogout = () => {
      dispatch(logout());
      props.navigation.navigate(MainRoutes.Auth);
    };
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <Button title='Logout' color={Colors.primary} onPress={handleLogout} />
        </SafeAreaView>
      </View>
    );
  },
});
