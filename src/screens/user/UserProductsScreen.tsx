import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import ProductItem from '@app/components/shop/ProductItem';
import { HeaderButton } from '@app/components/UI';
import colors from '@app/constants/Colors';
import { useReducer } from '@app/hooks';
import { AdminRoutes } from '@app/navigation/routes';
import { deleteProduct } from '@app/store/products';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserProductsScreen = ({ navigation }: Props) => {
  const { selector, dispatch } = useReducer();
  const { userProducts } = selector((state) => state.products);

  const handleEditPress = (id: string, title: string) => {
    navigation.navigate({
      routeName: AdminRoutes.EditProduct,
      params: { id, title: `Edit ${title}` },
    });
  };

  const handleDeletePress = (id: string) => {
    Alert.alert('Are you sure?', 'Do you want to delete this item?', [
      { text: 'no', style: 'default' },
      {
        text: 'yes',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct({ itemId: id })),
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          price={item.price}
          title={item.title}
          onSelect={() => handleEditPress(item.id, item.title)}>
          <Button
            title='Edit'
            onPress={() => handleEditPress(item.id, item.title)}
            color={colors.primary}
          />
          <Button
            title='Delete'
            onPress={() => handleDeletePress(item.id)}
            color={colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: 'Your products!',
    // eslint-disable-next-line react/display-name
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='md-menu'
          onPress={() => navigationData.navigation.toggleDrawer()}></Item>
      </HeaderButtons>
    ),
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='md-create'
          onPress={() =>
            navigationData.navigation.navigate({
              routeName: AdminRoutes.EditProduct,
              params: { title: 'Create new product' },
            })
          }></Item>
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
