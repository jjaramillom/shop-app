import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import isDecimal from 'validator/lib/isDecimal';
import isEmpty from 'validator/lib/isEmpty';
import isFloat from 'validator/lib/isFloat';
import isURL from 'validator/lib/isURL';

import DefaultText from './DefaultText';
import DefaultTextBold from './DefaultTextBold';

export type ValueType = 'string' | 'number' | 'url';

export interface Props extends Omit<TextInputProps, 'onChange' | 'value'> {
  label: string;
  errorMessage: string;
  onChange: (text: string, isValid: boolean) => void;
  type: ValueType;
  value: string;
  required?: boolean;
  minLength?: number;
  minValue?: number;
}

const Input: React.FC<Props> = (props: Props) => {
  const {
    errorMessage,
    label,
    type,
    onChange,
    value: initialValue,
    required,
    minLength,
    minValue,
    ...rest
  } = props;

  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(!!initialValue);
  const [touched, setTouched] = useState(false);

  const validate = (text: string) => {
    let isValid = true;
    if (required) {
      isValid = isValid && !isEmpty(text);
    }
    if (minLength) {
      isValid = isValid && text.length > minLength;
    }
    if (minValue && type === 'number') {
      isValid = isValid && Number(text) > minValue;
    }
    switch (type) {
      case 'string':
        return isValid;
      case 'number':
        return isValid && (isFloat(text) || isDecimal(text));
      case 'url':
        return isValid && isURL(text);
    }
  };

  const handleChange = (text: string) => {
    const isValueValid = validate(text);
    setIsValid(isValueValid);

    setValue(text);
    onChange(text, isValueValid);
  };

  return (
    <View style={styles.formControl}>
      <DefaultTextBold style={styles.label}>{label}</DefaultTextBold>
      <TextInput
        value={value}
        onChangeText={handleChange}
        onBlur={() => setTouched(true)}
        style={[styles.input, !isValid && touched ? styles.invalidInput : null]}
        autoCapitalize='sentences'
        returnKeyType='next'
        {...rest}
      />
      {!isValid && touched && (
        <DefaultText style={styles.errorMessage}>{errorMessage}</DefaultText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 5,
  },
  input: {
    paddingHorizontal: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  invalidInput: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: 'red',
  },
  formControl: {
    marginTop: 10,
    width: '100%',
  },
});

export default Input;
