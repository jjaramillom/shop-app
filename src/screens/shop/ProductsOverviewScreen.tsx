import React from 'react';
import { FlatList, Button } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import ProductItem from '@app/components/shop/ProductItem';
import { HeaderButton } from '@app/components/UI';
import colors from '@app/constants/Colors';
import { useReducer } from '@app/hooks';
import { ProductsRoutes } from '@app/navigation/routes';
import { addProduct } from '@app/store/cart';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProductsOverviewScreen = ({ navigation }: StackProps) => {
  const { dispatch, selector } = useReducer();
  const availableProducts = selector((state) => state.products.availableProducts);

  const handleAddToCart = (id: string) => {
    const productToAdd = availableProducts.find((p) => p.id === id);
    if (productToAdd) {
      dispatch(addProduct({ product: productToAdd }));
    }
  };
  const handleViewDetails = (id: string, title: string) =>
    navigation.navigate({ routeName: ProductsRoutes.ProductDetails, params: { id, title } });

  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          price={item.price}
          title={item.title}
          onSelect={() => handleViewDetails(item.id, item.title)}>
          <Button
            title='View Details'
            color={colors.primary}
            onPress={() => handleViewDetails(item.id, item.title)}
          />
          <Button
            title='Add to Cart'
            color={colors.primary}
            onPress={() => handleAddToCart(item.id)}
          />
        </ProductItem>
      )}
      keyExtractor={(el) => el.id}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: 'All products!',
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='md-cart'
          onPress={() => navigationData.navigation.navigate(ProductsRoutes.Cart)}></Item>
      </HeaderButtons>
    ),
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

export default ProductsOverviewScreen;
