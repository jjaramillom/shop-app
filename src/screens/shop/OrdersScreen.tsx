import React from 'react';
import { FlatList } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import OrderItem from '@app/components/shop/OrderItem';
import { HeaderButton } from '@app/components/UI';
import { useReducer } from '@app/hooks';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const OrdersScreen = ({ navigation }: Props) => {
  const { selector } = useReducer();
  const { orders } = selector((state) => state.orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem date={item.date} price={item.price} items={item.cartItems} />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: 'Your orders!',

    // eslint-disable-next-line react/display-name
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='md-menu'
          onPress={() => navigationData.navigation.toggleDrawer()}></Item>
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
