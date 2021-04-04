import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { HeaderButton, DefaultTextBold } from '@app/components/UI';
import { useReducer } from '@app/hooks';
import { addProduct, editProduct } from '@app/store/products';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EditProductScreen = ({ navigation }: Props) => {
  const { selector, dispatch } = useReducer();
  const { userProducts } = selector((state) => state.products);

  const productId: string = navigation.getParam('id');
  const productToEdit = userProducts.find((p) => p.id === productId);

  const [title, setTitle] = useState<string>(productToEdit?.title ?? '');
  const [imageUrl, setImageUrl] = useState<string>(productToEdit?.imageUrl ?? '');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>(productToEdit?.description ?? '');

  const handleSubmit = useCallback(() => {
    const product = {
      title,
      imageUrl,
      description,
    };

    if (productToEdit) {
      dispatch(editProduct({ ...product, id: productId }));
    } else {
      dispatch(addProduct({ ...product, price: Number(price) }));
    }
    navigation.goBack();
  }, [title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ submitHandler: handleSubmit });
  }, [handleSubmit]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultTextBold style={styles.label}>Title</DefaultTextBold>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <DefaultTextBold style={styles.label}>Image URL</DefaultTextBold>
          <TextInput value={imageUrl} style={styles.input} onChangeText={setImageUrl} />
        </View>
        {productToEdit ? null : (
          <View style={styles.formControl}>
            <DefaultTextBold style={styles.label}>Price</DefaultTextBold>
            <TextInput
              keyboardType='numbers-and-punctuation'
              value={price}
              style={styles.input}
              onChangeText={setPrice}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <DefaultTextBold style={styles.label}>Description</DefaultTextBold>
          <TextInput value={description} style={styles.input} onChangeText={setDescription} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 5,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: {
    width: '100%',
  },
  form: {
    margin: 20,
  },
});

EditProductScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  const title = navigationData.navigation.getParam('title');
  const submit = navigationData.navigation.getParam('submitHandler');
  return {
    title,
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Save' iconName='md-checkmark' onPress={submit}></Item>
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;
