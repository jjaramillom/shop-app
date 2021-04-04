import moment from 'moment';
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import CartItemComponent from './CartItem';
import { DefaultTextBold, DefaultText, Card } from '@app/components/UI';
import colors from '@app/constants/Colors';
import CartItem from '@app/models/CartItem';

type Props = {
  date: Date;
  price: number;
  items: CartItem[];
};

const OrderItem: React.FC<Props> = ({ price, date, items }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.wrapper}>
      <View>
        <View style={styles.summary}>
          <DefaultTextBold style={styles.price}>${price.toFixed(2)}</DefaultTextBold>
          <DefaultText style={styles.date}>
            {moment(date).format('MMMM Do YYYY, hh:mm')}
          </DefaultText>
        </View>
        <Button
          title={`${showDetails ? 'Hide' : 'Show'} Details`}
          color={colors.primary}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
        {showDetails && (
          <View style={styles.details}>
            {items.map((i) => (
              <CartItemComponent
                key={i.title}
                price={i.price}
                quantity={i.quantity}
                title={i.title}
              />
            ))}
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    color: '#888',
  },
  price: {
    fontSize: 16,
  },
  details: {
    marginTop: 10,
  },
});

export default OrderItem;
