import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { AuthRoutes } from './routes';
import { defaultStackNavigationOptions, Route } from './shared';
import AuthScreen from '@app/screens/user/AuthScreen';

type RoutesMap = {
  [key in AuthRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const routesMap: RoutesMap = {
  Auth: {
    screen: AuthScreen,
  },
};

export default createStackNavigator(routesMap, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});
