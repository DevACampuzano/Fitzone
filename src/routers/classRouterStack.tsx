import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Class, ClassDetail } from '../screens';
import { TabNavigatorMainScreenProps } from './main';

export type ClassRouterScreenProps<S extends keyof ClassRouterScreen> =
  NativeStackScreenProps<ClassRouterScreen, S>;

const Stack = createNativeStackNavigator<ClassRouterScreen>();
export const ClassRouter: React.FC<
  TabNavigatorMainScreenProps<'Class'>
> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'list'}
    >
      <Stack.Screen name="list" component={Class} />
      <Stack.Screen
        name="ClassDetail"
        component={ClassDetail}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
