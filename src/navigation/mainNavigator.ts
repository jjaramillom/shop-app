import { createSwitchNavigator, NavigationSwitchProp } from 'react-navigation';

import authenticationNavigator from './authenticationNavigator';
import { MainRoutes } from './routes';
import { Route } from './shared';
import shopNavigator from './shopNavigator';
import StartupScreen from '@app/screens/StartupScreen';

type RoutesMap = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key in MainRoutes]: Route<{}, NavigationSwitchProp<unknown>>;
};

const routesMap: RoutesMap = {
  Startup: { screen: StartupScreen },
  Auth: { screen: authenticationNavigator },
  Shop: { screen: shopNavigator },
};

export default createSwitchNavigator(routesMap);
