import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { AUTH } from '@app/asyncStorageKeys';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { MainRoutes } from '@app/navigation/routes';
import { AuthStoredData, autoLogin } from '@app/store/auth';

interface Props {
  navigation: NavigationStackProp<unknown>;
}
interface LoginData extends Omit<AuthStoredData, 'expirationDate'> {
  expirationDate: Date;
}

const loadDataFromStorage = async (): Promise<LoginData | void> => {
  const data = await AsyncStorage.getItem(AUTH);
  console.log(data);
  if (!data) {
    return;
  }

  const parsedData: AuthStoredData = JSON.parse(data);

  return { ...parsedData, expirationDate: new Date(parsedData.expirationDate) };
};

const StartupScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { dispatch } = useReducer();

  useEffect(() => {
    (async () => {
      const data = await loadDataFromStorage();
      if (!data) {
        navigation.navigate(MainRoutes.Auth);
        return;
      }
      console.log(data.expirationDate.getTime(), Date.now());
      if (data.expirationDate.getTime() > Date.now()) {
        dispatch(autoLogin({ token: data.token, userId: data.userId }));
        navigation.navigate(MainRoutes.Shop);
      } else {
        navigation.navigate(MainRoutes.Auth);
      }
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
