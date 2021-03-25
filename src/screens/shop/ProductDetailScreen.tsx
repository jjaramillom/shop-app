import React from 'react';
import {
  Image,
  StyleSheet,
  Button,
  ScrollView,
  View,
  // ProgressViewIOSComponent,
} from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { DefaultText, DefaultTextBold } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useProductsReducer } from '@app/hooks';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProductDetailScreen = ({ navigation }: Props) => {
  const id = navigation.getParam('id');
  const [, { availableProducts }] = useProductsReducer();
  const selectedProduct = availableProducts.find((p) => p.id === id);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct?.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title='Add to cart' onPress={() => {}} />
      </View>
      <DefaultTextBold style={styles.price}>
        ${selectedProduct?.price.toFixed(2)}
      </DefaultTextBold>
      <DefaultText style={styles.description}>{selectedProduct?.description}</DefaultText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginVertical: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

ProductDetailScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: navigationData.navigation.getParam('title'),
  };
};

export default ProductDetailScreen;
