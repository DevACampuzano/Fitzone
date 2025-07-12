import { useState, useContext } from 'react';
import { useForm } from '../../../common/hooks';
import { ToastContext, useUserStore } from '../../../common/store';
import { UserActions } from '../../../actions';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  email: string;
  password: string;
}

const initialState: FormData = {
  email: 'a@a.c',
  password: '1234',
};

export const useLogin = () => {
  const { email, password, onChange } = useForm<FormData>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useContext(ToastContext);
  const saveUser = useUserStore(state => state.setUser);
  const saveToken = useUserStore(state => state.setToken);
  const mutation = useMutation({
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
    onSuccess: ({ data: { data, status } }) => {
      if (status) {
        showToast('Inicio de sesión exitoso', 'checkmark-circle-outline');
        saveUser(data.user);
        saveToken(data.token);
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
