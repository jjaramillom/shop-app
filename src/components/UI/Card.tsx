import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type Props = React.PropsWithChildren<ViewProps>;

const Card: React.FC<Props> = (props: Props) => {
  const { children, style, ...otherProps } = props;
  return (
    <View {...otherProps} style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 20,
    backgroundColor: 'white',
  },
});

export default Card;
