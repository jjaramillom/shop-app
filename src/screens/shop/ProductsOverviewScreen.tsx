import React from 'react';
import { FlatList } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import ProductItem from '@app/components/ProductItem';
import { useProductsReducer, useCartItemsReducer } from '@app/hooks';
import { ProductsRoutes } from '@app/navigation/routes';
import { addToCart } from '@app/store/actions';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

const ProductsOverviewScreen: React.FC<StackProps> = ({ navigation }: StackProps) => {
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

export default ProductsOverviewScreen;
