import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

import TouchableComponent from '@app/components/TouchableComponent';
import colors from '@app/constants/colors';

type Props = {
  imageUrl: string;
  title: string;
  price: number;
  onAddToCart: () => void;
  onViewDetails: () => void;
};

const ProductItem: React.FC<Props> = ({
  imageUrl,
  price,
  title,
  onAddToCart,
  onViewDetails,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableComponent onPress={onViewDetails} useForeground={true}>
        <View>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <Button title='View Details' color={colors.primary} onPress={onViewDetails} />
            <Button title='Add to Cart' color={colors.primary} onPress={onAddToCart} />
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    marginVertical: 4,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default ProductItem;
