import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import OrderItem from '@app/components/shop/OrderItem';
import { HeaderButton } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { fetchOrders } from '@app/store/orders';

interface Props {
  navigation: NavigationStackProp<unknown>;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const OrdersScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { selector, dispatch } = useReducer();
  const { orders } = selector((state) => state.orders);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await dispatch(fetchOrders());
      setIsLoading(false);
    })();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.primary} size='large' />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem date={item.date} price={item.price} items={item.cartItems} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
