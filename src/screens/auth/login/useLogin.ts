import { useState } from 'react';
import { useForm } from '../../../common/hooks';
import { Alert } from 'react-native';

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { form, onChange } = useForm<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
  };

  return {
    ...form,
    showPassword,
    setShowPassword,
    isLoading,
    handleLogin,
    onChange,
  };
};
