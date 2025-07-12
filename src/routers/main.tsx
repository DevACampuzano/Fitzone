import Icon from '@react-native-vector-icons/ionicons';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Home } from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabNavigatorMainScreenProps<S extends keyof TabBarScreenMain> =
  BottomTabScreenProps<TabBarScreenMain, S>;

const Tab = createBottomTabNavigator<TabBarScreenMain>();

export const TabNavigatorMain = () => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
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
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingVertical: 10,
          paddingBottom: paddingBottom,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};
