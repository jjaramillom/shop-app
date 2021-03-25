import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import ProductItem from '@app/components/shop/ProductItem';
import { HeaderButton } from '@app/components/UI';
import { useProductsReducer, useCartItemsReducer } from '@app/hooks';
import { ProductsRoutes } from '@app/navigation/routes';
import { addToCart } from '@app/store/actions';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProductsOverviewScreen = ({ navigation }: StackProps) => {
  const [, { availableProducts }] = useProductsReducer();
  const [dispatch] = useCartItemsReducer();

  const handleAddToCart = (id: string) => {
    const productToAdd = availableProducts.find((p) => p.id === id);
    if (productToAdd) {
      dispatch(addToCart(productToAdd));
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
          onAddToCart={() => handleAddToCart(item.id)}
          onViewDetails={() => handleViewDetails(item.id, item.title)}
        />
      )}
      keyExtractor={(el) => el.id}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: navigationData.navigation.getParam('title'),
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='md-cart'
          onPress={() => navigationData.navigation.navigate(ProductsRoutes.Cart)}></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
