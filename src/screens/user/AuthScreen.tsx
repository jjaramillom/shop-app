import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { Card, Input } from '@app/components/UI';
import colors from '@app/constants/Colors';
import { useReducer } from '@app/hooks';
import { MainRoutes } from '@app/navigation';
import { signUp, login } from '@app/store/auth';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AuthScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { dispatch } = useReducer();

  const isFormValid = () => isUsernameValid && isPasswordValid;

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    setIsPasswordValid(isValid);
  };

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsUsernameValid(isValid);
  };

  const handleAuth = async () => {
    if (!isFormValid()) {
      return;
    }
    setIsLoading(true);
    setError(undefined);
    const resultAction = await dispatch(
      isSignUp ? signUp({ email, password }) : login({ email, password })
    );
    setIsLoading(false);

    if (signUp.fulfilled.match(resultAction) || login.fulfilled.match(resultAction)) {
      navigation.navigate(MainRoutes.Shop);
    } else if (signUp.rejected.match(resultAction) || login.rejected.match(resultAction)) {
      setError(resultAction.error.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { style: 'default', text: 'ok', onPress: () => setError(undefined) },
      ]);
    }
  }, [error]);

  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={30}
        style={styles.screen}>
        <Card style={styles.card}>
          <ScrollView>
            <Input
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorMessage='Please enter a valid email address.'
              onChange={handleEmailChange}
            />
            <Input
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorMessage='Please enter a valid password.'
              onChange={handlePasswordChange}
            />
            {isLoading ? (
              <ActivityIndicator size='large' />
            ) : (
              <>
                <View style={styles.buttonWrapper}>
                  <Button
                    title={isSignUp ? 'sign up' : 'login'}
                    color={colors.primary}
                    onPress={handleAuth}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button
                    title={`switch to ${isSignUp ? 'login' : 'sign up'}`}
                    color={colors.accent}
                    onPress={() => setIsSignUp((val) => !val)}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

AuthScreen.navigationOptions = (navigationData: {
  navigation: NavigationDrawerProp<unknown>;
}): NavigationStackOptions => {
  return {
    title: 'Authenticate',
  };
};

export default AuthScreen;
