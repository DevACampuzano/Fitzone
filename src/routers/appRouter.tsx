import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TabNavigatorMain } from './main';
import { Login, Register } from '../screens';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../common/store';

export type AppRouterScreenProps<S extends keyof AppRouterScreen> =
  NativeStackScreenProps<AppRouterScreen, S>;

const Stack = createNativeStackNavigator<AppRouterScreen>();
export const AppRouter = () => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const token = useUserStore(state => state.token);
  return (
    <View style={[styles.container, { paddingTop }]}>
      {token ? (
        <TabNavigatorMain />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingBottom,
            },
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
