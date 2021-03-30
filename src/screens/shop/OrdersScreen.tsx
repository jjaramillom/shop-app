import React from 'react';
import { FlatList, Text } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { HeaderButton } from '@app/components/UI';
import { useOrdersReducer } from '@app/hooks';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const OrdersScreen = ({ navigation }: Props) => {
  const [, { orders }] = useOrdersReducer();

  return (
    <FlatList data={orders} renderItem={(itemData) => <Text>{itemData.item.price}</Text>} />
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
