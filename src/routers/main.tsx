import Icon from '@react-native-vector-icons/ionicons';
import {
  type BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Home, Profile, Reservations } from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClassRouter } from './classRouterStack';

export type TabNavigatorMainScreenProps<S extends keyof TabBarScreenMain> =
  BottomTabScreenProps<TabBarScreenMain, S>;

const Tab = createBottomTabNavigator<TabBarScreenMain>();

export const TabNavigatorMain = () => {
  const { bottom } = useSafeAreaInsets();
  const tabBarIcon = (
    { color, size, focused }: TabBarIconProps,
    route: RouteProp<ParamListBase, string>,
  ) => {
    let iconName: React.ComponentProps<typeof Icon>['name'] = 'ellipse';

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Class') {
      iconName = focused ? 'fitness' : 'fitness-outline';
    } else if (route.name === 'Reservations') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    }

    return <Icon name={iconName} size={size} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: props => tabBarIcon(props, route),
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E5EA',
          borderRadius: 16,
          height: 55,
          position: 'absolute',
          bottom,
          left: 10,
          right: 10,
          marginHorizontal: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Class"
        component={ClassRouter}
        options={{
          title: 'Clases',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
        }}
      />

      <Tab.Screen
        name="Reservations"
        component={Reservations}
        options={{
          title: 'Reservas',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};
