import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Button, View } from 'react-native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { Card, Input } from '@app/components/UI';
import colors from '@app/constants/Colors';
// import { useReducer } from '@app/hooks';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AuthScreen = ({ navigation }: Props) => {
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
              onChange={console.log}
            />
            <Input
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorMessage='Please enter a valid password.'
              onChange={console.log}
            />
            <View style={styles.buttonWrapper}>
              <Button
                title='Login'
                color={colors.primary}
                onPress={() => console.log('login')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title='Signup'
                color={colors.accent}
                onPress={() => console.log('signup')}
              />
            </View>
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
