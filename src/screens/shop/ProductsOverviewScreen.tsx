import React from 'react';
import { FlatList } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import ProductItem from '@app/components/ProductItem';
import { useProductsReducer } from '@app/hooks';
import { ProductsRoutes } from '@app/navigation/routes';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

const ProductsOverviewScreen: React.FC<StackProps> = ({ navigation }: StackProps) => {
  const [_, { availableProducts }] = useProductsReducer();

  const handleAddToCart = (id: string) => console.log(id);
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
