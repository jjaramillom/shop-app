import React from 'react';
import {
  // View,
  Text,
  // Image,
  // StyleSheet,
  // Button,
  // ScrollView,
  // ProgressViewIOSComponent,
} from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

// import { useProductsReducer } from '@app/hooks';

interface StackProps {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProductDetailScreen = ({ navigation }: StackProps) => {
  // const id = navigation.getParam('id');
  // const [_, { availableProducts }] = useProductsReducer();
  // const selectedProduct = availableProducts.find((p) => p.id === id);

  return <Text>Component</Text>;
};

ProductDetailScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: navigationData.navigation.getParam('title'),
  };
};

export default ProductDetailScreen;
