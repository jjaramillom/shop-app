import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { HeaderButton, Input } from '@app/components/UI';
import { Props as InputProps } from '@app/components/UI/Input';
import { useReducer as useReduxReducer } from '@app/hooks';
import { addProduct, editProduct } from '@app/store/products';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

type InputValues = {
  title: string;
  imageUrl: string;
  price?: string;
  description: string;
};

type InputVariable = 'title' | 'imageUrl' | 'price' | 'description';

type FormState = {
  inputValues: InputValues;
  inputValidation: {
    [key in InputVariable]: boolean;
  };
  formIsValid: boolean;
};

type Action = {
  type: 'FORM_UPDATE';
  payload: { input: InputVariable; value: string; isValid: boolean };
};

const formReducer = (state: FormState, action: Action): FormState => {
  if (action.type === 'FORM_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.payload.input]: action.payload.value,
    };

    const updatedValidations = {
      ...state.inputValidation,
      [action.payload.input]: action.payload.isValid,
    };
    let formIsValid = true;
    for (const [, valid] of Object.entries(state.inputValidation)) {
      if (!valid) {
        formIsValid = false;
        break;
      }
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidation: updatedValidations,
      formIsValid,
    };
  }
  return state;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EditProductScreen = ({ navigation }: Props) => {
  const { selector, dispatch } = useReduxReducer();
  const { userProducts } = selector((state) => state.products);

  const productId: string = navigation.getParam('id');
  const productToEdit = userProducts.find((p) => p.id === productId);

  const [state, dispatchFormReducer] = useReducer(formReducer, {
    inputValidation: {
      title: !!productToEdit,
      imageUrl: !!productToEdit,
      price: !!productToEdit,
      description: !!productToEdit,
    },
    formIsValid: !!productToEdit,
    inputValues: {
      title: productToEdit?.title ?? '',
      imageUrl: productToEdit?.imageUrl ?? '',
      description: productToEdit?.description ?? '',
      price: '',
    },
  });

  const handleSubmit = useCallback(() => {
    const product = {
      title: state.inputValues.title,
      imageUrl: state.inputValues.imageUrl,
      description: state.inputValues.description,
    };
    if (!state.formIsValid) {
      return Alert.alert('Invalid data!', 'Please enter valid data in the form.');
    }

    if (productToEdit) {
      dispatch(editProduct({ ...product, id: productId }));
    } else {
      dispatch(addProduct({ ...product, price: Number(state.inputValues.price) }));
    }
    navigation.goBack();
  }, [state.inputValues]);

  useEffect(() => {
    navigation.setParams({ submitHandler: handleSubmit });
  }, [handleSubmit]);

  const handleTextChange = (text: string, isValid: boolean, input: InputVariable) => {
    dispatchFormReducer({
      type: 'FORM_UPDATE',
      payload: {
        value: text,
        input,
        isValid,
      },
    });
  };

  const handleNumberChange = (text: string, isValid: boolean, input: InputVariable) => {
    dispatchFormReducer({
      type: 'FORM_UPDATE',
      payload: {
        value: text,
        input,
        isValid,
      },
    });
  };

  const inputsMap = useMemo(
    (): InputProps[] => [
      {
        label: 'Title',
        errorMessage: 'Please enter a valid title',
        onChange: (text: string, isValid: boolean) => handleTextChange(text, isValid, 'title'),
        type: 'string',
        returnKeyType: 'next',
        value: productToEdit?.title ?? '',
      },
      {
        label: 'Image URL',
        errorMessage: 'Please enter a valid image URL',
        onChange: (text: string, isValid: boolean) =>
          handleTextChange(text, isValid, 'imageUrl'),
        type: 'url',
        returnKeyType: 'next',
        value: productToEdit?.imageUrl ?? '',
      },
      {
        label: 'Price',
        errorMessage: 'Please enter a valid price',
        onChange: (text: string, isValid: boolean) =>
          handleNumberChange(text, isValid, 'price'),
        type: 'number',
        keyboardType: 'decimal-pad',
        returnKeyType: 'next',
        value: productToEdit?.price.toString() ?? '',
      },
      {
        label: 'Description',
        errorMessage: 'Please enter a valid description',
        onChange: (text: string, isValid: boolean) =>
          handleTextChange(text, isValid, 'description'),
        type: 'string',
        autoCapitalize: 'sentences',
        multiline: true,
        numberOfLines: 3,
        returnKeyType: 'next',
        value: productToEdit?.description ?? '',
      },
    ],
    []
  );

  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior='padding'
      keyboardVerticalOffset={10}>
      <ScrollView>
        <View style={styles.form}>
          {inputsMap
            .filter((i) => !productToEdit || (productToEdit && i.label !== 'Price'))
            .map((i) => (
              <Input key={i.label} {...i} />
            ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  avoidingView: {
    flex: 1,
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
