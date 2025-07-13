/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContext, useUserStore } from '../../../common/store';
import { Alert } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useQueries } from '@tanstack/react-query';
import { classActions, UserActions } from '../../../actions';
import { useContext, useEffect } from 'react';
import { useErrorsToken } from '../../../common/helpers';

export const useHome = (
  navigation: BottomTabNavigationProp<TabBarScreenMain, 'Home', undefined>,
) => {
  const [featuredClasses, myProgress] = useQueries({
    queries: [
      {
        queryKey: ['featuredClasses'],
        queryFn: ({ signal }) => classActions.getClasses(2, 0, signal),
        // staleTime: 1000 * 60 * 60,
        initialData: {
          status: true,
          data: [],
        },
        select: (data: any) => data.data,
      },
      {
        queryKey: ['myProgress'],
        queryFn: ({ signal }) => UserActions.getMyProgress(signal),
        // staleTime: 1000 * 60 * 60,
        initialData: {
          status: true,
          data: {
            totalClasses: 0,
            nextClasses: 0,
          },
        },
        select: (data: any) => data.data,
      },
    ],
  });
  const userName = useUserStore(state => state.user.name);
  const { showToast } = useContext(ToastContext);
  const { validateError } = useErrorsToken();

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

  useEffect(() => {
    if (featuredClasses.error) {
      const msg = validateError(featuredClasses.error.message);
      showToast(msg, 'warning-sharp');
    }
    if (myProgress.error) {
      const msg = validateError(myProgress.error.message);
      showToast(msg, 'warning-sharp');
    }
  }, [featuredClasses.error, myProgress.error]);

  return {
    featuredClasses: featuredClasses.data as FeaturedClass[],
    myProgress: myProgress.data,
    userName,
    handleQuickAction,
  };
};
