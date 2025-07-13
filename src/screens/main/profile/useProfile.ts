/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import { ToastContext, useUserStore } from '../../../common/store';
import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useQueries } from '@tanstack/react-query';
import { classActions } from '../../../actions';
import { useErrorsToken } from '../../../common/helpers';
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
];
export const useProfile = () => {
  const navigation = useNavigation();
  const onClose = useUserStore(state => state.clearUser);
  const user = useUserStore(state => state.user);

  const [{ data: stats, error: errorStats }] = useQueries({
    queries: [
      {
        queryKey: ['stats'],
        queryFn: ({ signal }) => classActions.getMyStats(signal),
        initialData: {
          status: true,
          data: {
            totalClasses: 0,
          },
        },
        select: (data: any) => data.data,
      },
    ],
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { showToast } = useContext(ToastContext);
  const { validateError } = useErrorsToken();

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

  useEffect(() => {
    if (errorStats) {
      const msg = validateError(errorStats.message);
      showToast(msg, 'warning-sharp');
    }
  }, [errorStats]);

  return {
    handleLogout,
    user,
    notificationsEnabled,
    setNotificationsEnabled,
    menuItems,
    stats,
  };
};
