import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { TouchableComponent, DefaultTextBold, DefaultText, Card } from '@app/components/UI';

type Props = {
  imageUrl: string;
  title: string;
  price: number;
  onSelect?: () => void;
};

const ProductItem: React.FC<React.PropsWithChildren<Props>> = ({
  imageUrl,
  price,
  title,
  onSelect,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Card style={styles.wrapper}>
      <TouchableComponent onPress={onSelect} useForeground={true}>
        <View>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.details}>
            <DefaultTextBold style={styles.title}>{title}</DefaultTextBold>
            <DefaultText style={styles.price}>${price.toFixed(2)}</DefaultText>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
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
    marginVertical: 2,
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
