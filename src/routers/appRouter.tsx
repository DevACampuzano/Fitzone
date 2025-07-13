import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TabNavigatorMain } from './main';
import { Login, Register } from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../common/store';

export type AppRouterScreenProps<S extends keyof AppRouterScreen> =
  NativeStackScreenProps<AppRouterScreen, S>;

const Stack = createNativeStackNavigator<AppRouterScreen>();
export const AppRouter = () => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const token = useUserStore(state => state.token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#F8F9FA',
          paddingTop,
          paddingBottom,
        },
      }}
      initialRouteName={token ? 'Main' : 'Login'}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Main"
        component={TabNavigatorMain}
        options={{
          contentStyle: {
            backgroundColor: '#F8F9FA',
            paddingTop,
            paddingBottom: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
