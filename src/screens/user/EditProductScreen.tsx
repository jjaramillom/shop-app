import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { HeaderButton, Input, DefaultTextBold } from '@app/components/UI';
import { Props as InputProps } from '@app/components/UI/Input';
import { Colors } from '@app/constants';
import { useReducer as useReduxReducer } from '@app/hooks';
import { createProduct, editProduct } from '@app/store/products';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
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

  const handleSubmit = useCallback(async () => {
    const product = {
      title: state.inputValues.title,
      imageUrl: state.inputValues.imageUrl,
      description: state.inputValues.description,
    };
    if (!state.formIsValid) {
      return Alert.alert('Invalid data!', 'Please enter valid data in the form.');
    }

    setIsLoading(true);
    setError(undefined);

    let resultAction;
    if (productToEdit) {
      resultAction = await dispatch(editProduct({ ...product, id: productId }));
    } else {
      resultAction = await dispatch(
        createProduct({ ...product, price: Number(state.inputValues.price) })
      );
    }

    setIsLoading(false);

    if (editProduct.fulfilled.match(resultAction)) {
      navigation.goBack();
    } else if (editProduct.rejected.match(resultAction)) {
      setError(resultAction.payload?.errorMessage);
      navigation.setParams({ error: true });
    }
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultTextBold>{error} :(</DefaultTextBold>
      </View>
    );
  }

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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

EditProductScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  const title = navigationData.navigation.getParam('title');
  const submit = navigationData.navigation.getParam('submitHandler');
  const error = navigationData.navigation.getParam('error');
  return {
    title,
    ...(!error && {
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='Save' iconName='md-checkmark' onPress={submit}></Item>
        </HeaderButtons>
      ),
    }),
  };
};

export default EditProductScreen;
