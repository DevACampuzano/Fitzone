import { useState } from 'react';
import { useUserStore } from '../../../common/store';
import { Alert } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const data: FeaturedClass[] = [
  {
    id: '1',
    name: 'CrossFit Matutino',
    time: '07:00 AM',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    spots: 5,
  },
  {
    id: '2',
    name: 'Yoga Relajante',
    time: '06:30 PM',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    spots: 8,
  },
];

export const useHome = (
  navigation: BottomTabNavigationProp<TabBarScreenMain, 'Home', undefined>,
) => {
  const [featuredClasses, _] = useState<FeaturedClass[]>(data);
  const userName = useUserStore(state => state.user.name);

  const handleQuickAction = (actionId: string | number) => {
    switch (actionId) {
      case '1':
        navigation.navigate('Class');
        break;
      case '2':
        Alert.alert('Membresías', 'Función en desarrollo');
        break;
    }
  };

  return {
    featuredClasses,
    userName,
    handleQuickAction,
  };
};
