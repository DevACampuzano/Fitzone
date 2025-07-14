import { useState, useContext } from 'react';
import { useForm } from '../../../common/hooks';
import { ToastContext, useUserStore } from '../../../common/store';
import { notificationActions, UserActions } from '../../../actions';
import { useMutation } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { handleCheckNotifications, getFCMToken } from '../../../common/helpers';

interface FormData {
  email: string;
  password: string;
}

const initialState: FormData = {
  email: 'andres@gmail.com',
  password: '1234',
};

export const useLogin = (
  navigation: NativeStackNavigationProp<AppRouterScreen, 'Login', undefined>,
) => {
  const { email, password, onChange } = useForm<FormData>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useContext(ToastContext);
  const saveUser = useUserStore(state => state.setUser);
  const saveToken = useUserStore(state => state.setToken);

  const mutationNotifications = useMutation({
    mutationKey: ['add-fcm-token'],
    mutationFn: (token: string) => notificationActions.addFCMToken(token),
    onError: (error: Error) => {
      showToast(error.message, 'warning-sharp');
    },
  });

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email: loginEmail, password: loginPassword }: FormData) =>
      UserActions.login(loginEmail, loginPassword),
    onMutate: () => {
      if (!email || !password) {
        showToast('Por favor, completa todos los campos.', 'warning-sharp');
        throw new Error('Campos incompletos');
      }
    },
    onError: (error: Error) => {
      showToast(error.message, 'warning-sharp');
    },
    onSuccess: async ({ data: { data, status } }) => {
      if (status) {
        showToast('Inicio de sesión exitoso', 'checkmark-circle-outline');
        saveUser(data.user);
        saveToken(data.token);
        const check = await handleCheckNotifications();
        if (check) {
          const token = await getFCMToken();
          if (token) {
            await mutationNotifications.mutateAsync(token);
          }
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' as never }],
        });
      }
    },
  });

  return {
    email,
    password,
    showPassword,
    setShowPassword,
    isLoading: mutation.isPending,
    handleLogin: mutation.mutate,
    onChange,
  };
};
