import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { DefaultText, DefaultTextBold } from '@app/components/UI';

type Props = {
  onRemove?: () => void;
  deletable?: boolean
  quantity: number;
  title: string;
  price: number;
};

const CartItem: React.FC<Props> = ({ onRemove, quantity, title, price, deletable = true }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemDescription}>
        <DefaultText style={styles.quantity}>{quantity}</DefaultText>
        <DefaultTextBold style={styles.mainText} numberOfLines={1}>
          {title}
        </DefaultTextBold>
      </View>
      <View style={styles.itemPriceDelete}>
        <DefaultTextBold style={styles.mainText}>
          ${(quantity * price).toFixed(2)}
        </DefaultTextBold>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name='md-trash' size={23} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  quantity: {
    color: '#888',
    fontSize: 16,
    marginRight: 5,
  },
  mainText: {
    fontSize: 16,
  },
  itemDescription: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPriceDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
  },
  deleteButton: { marginLeft: 20 },
});

export default CartItem;
