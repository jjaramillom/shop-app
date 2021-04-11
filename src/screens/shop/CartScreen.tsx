import React, { useState } from 'react';
import { View, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import CartItem from '@app/components/shop/CartItem';
import { DefaultText, DefaultTextBold, Card } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { removeProduct } from '@app/store/cart';
import { createOrder } from '@app/store/orders';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CartScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, selector } = useReducer();
  const { items, totalPrice } = selector((state) => state.cartItems);

  const itemsArray = Object.keys(items)
    .map((k) => ({
      id: k,
      title: items[k].title,
      quantity: items[k].quantity,
      price: items[k].price,
    }))
    .sort((a, b) => (a.title < b.title ? -1 : 1));

  const handleCreateOrder = async () => {
    setIsLoading(true);
    await dispatch(createOrder({ items: itemsArray }));
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Card style={styles.summary}>
        <DefaultTextBold style={styles.summaryText}>
          Total{' '}
          <DefaultText style={styles.amount}>${Math.abs(totalPrice).toFixed(2)}</DefaultText>
        </DefaultTextBold>
        {isLoading ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Button
            title='Order Now'
            disabled={itemsArray.length === 0}
            color={Colors.primary}
            onPress={() => handleCreateOrder()}
          />
        )}
      </Card>
      {itemsArray.length === 0 ? null : (
        <Card style={styles.itemsCard}>
          <FlatList
            data={itemsArray}
            renderItem={({ item }) => (
              <CartItem
                price={item.price}
                title={item.title}
                quantity={item.quantity}
                onRemove={() => dispatch(removeProduct({ productId: item.id }))}
              />
            )}
          />
        </Card>
      )}
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

const navigationOptions: NavigationStackOptions = {
  headerTitle: 'Your cart!',
};

CartScreen.navigationOptions = navigationOptions;

export default CartScreen;
