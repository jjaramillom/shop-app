import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import ProductItem from '@app/components/shop/ProductItem';
import { DefaultTextBold, HeaderButton } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { ProductsRoutes } from '@app/navigation/routes';
import { addProduct } from '@app/store/cart';
import { fetchProducts } from '@app/store/products';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProductsOverviewScreen = ({ navigation }: StackProps) => {
  const { dispatch, selector } = useReducer();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const availableProducts = selector((state) => state.products.availableProducts);

  const loadProducts = useCallback(async () => {
    setError(undefined);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
      setError(undefined);
    } catch (error) {
      setError(error);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadProducts();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('willFocus', () => loadProducts());
    return () => listener.remove();
  }, [loadProducts]);

  const handleAddToCart = (id: string) => {
    const productToAdd = availableProducts.find((p) => p.id === id);
    if (productToAdd) {
      dispatch(addProduct({ product: productToAdd }));
    }
  };
  const handleViewDetails = (id: string, title: string) =>
    navigation.navigate({ routeName: ProductsRoutes.ProductDetails, params: { id, title } });

  if (error) {
    <View style={styles.centered}>
      <DefaultTextBold>{error} :(</DefaultTextBold>
    </View>;
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultTextBold>No Products found. Go and add some :)</DefaultTextBold>
      </View>
    );
  }

  return (
    <FlatList
      data={availableProducts}
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <ProductItem
          imageUrl={item.imageUrl}
          price={item.price}
          title={item.title}
          onSelect={() => handleViewDetails(item.id, item.title)}>
          <Button
            title='View Details'
            color={Colors.primary}
            onPress={() => handleViewDetails(item.id, item.title)}
          />
          <Button
            title='Add to Cart'
            color={Colors.primary}
            onPress={() => handleAddToCart(item.id)}
          />
        </ProductItem>
      )}
      keyExtractor={(el) => el.id}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
