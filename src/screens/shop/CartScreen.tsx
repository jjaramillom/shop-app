import React from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import CartItem from '@app/components/shop/CartItem';
import { DefaultText, DefaultTextBold, Card } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useCartItemsReducer } from '@app/hooks';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

const CartScreen: React.FC<Props> = (props: Props) => {
  const [, { items, totalPrice }] = useCartItemsReducer();
  const itemsArray = Object.keys(items).map((k) => ({
    id: k,
    title: items[k].title,
    quantity: items[k].quantity,
    price: items[k].price,
  }));
  return (
    <View style={styles.container}>
      <Card style={styles.summary}>
        <DefaultTextBold style={styles.summaryText}>
          Total <DefaultText style={styles.amount}>${totalPrice.toFixed(2)}</DefaultText>
        </DefaultTextBold>
        <Button
          title='Order Now'
          disabled={itemsArray.length === 0}
          color={Colors.primary}
          onPress={() => {}}
        />
      </Card>
      <Card style={styles.itemsCard}>
        <FlatList
          data={itemsArray}
          renderItem={({ item }) => (
            <CartItem
              price={item.price}
              title={item.title}
              quantity={item.quantity}
              onRemove={() => console.log('remove')}
            />
          )}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  itemsCard: {
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});

export default CartScreen;
