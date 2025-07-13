import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../../common/store';
import { useState } from 'react';
import { Alert } from 'react-native';
const menuItems = [
  {
    id: 'edit-profile',
    title: 'Editar Perfil',
    icon: 'person-outline',
    onPress: () => Alert.alert('Próximamente', 'Función en desarrollo'),
  },
  {
    id: 'membership',
    title: 'Mi Membresía',
    icon: 'card-outline',
    onPress: () => Alert.alert('Próximamente', 'Función en desarrollo'),
  },
  {
    id: 'payment-methods',
    title: 'Métodos de Pago',
    icon: 'wallet-outline',
    onPress: () => Alert.alert('Próximamente', 'Función en desarrollo'),
  },
];
export const useProfile = () => {
  const navigation = useNavigation();
  const onClose = useUserStore(state => state.clearUser);
  const user = useUserStore(state => state.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            onClose();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          },
        },
      ],
    );
  };

  return {
    handleLogout,
    user,
    notificationsEnabled,
    setNotificationsEnabled,
    menuItems,
  };
};
