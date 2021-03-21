import React from 'react';
import { FlatList, Text } from 'react-native';

import { useProductsReducer } from '@app/hooks';

const ProductsOverviewScreen = () => {
  const [_, { availableProducts }] = useProductsReducer();

  return (
    <FlatList
      data={availableProducts}
      renderItem={(data) => <Text>{data.item.title}</Text>}
      keyExtractor={(el) => el.id}>
      {' '}
    </FlatList>
  );
};

export default ProductsOverviewScreen;
