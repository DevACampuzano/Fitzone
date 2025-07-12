import { useState } from 'react';
import { useForm } from '../../../common/hooks';
import { Alert } from 'react-native';

const inicialState: FormDataRegister = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};
const validators: ValidateProps<FormDataRegister> = {
  firstName: {
    message: 'El nombre es requerido y debe tener al menos 2 caracteres',
    validate: /^[a-zA-Z\s]{2,}$/,
  },
  lastName: {
    message: 'El apellido es requerido y debe tener al menos 2 caracteres',
    validate: /^[a-zA-Z\s]{2,}$/,
  },
  email: {
    message: 'El correo electrónico es requerido y debe ser válido',
    validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    message: 'El teléfono es requerido y debe tener 10 dígitos',
    validate: /^[0-9]{10}$/,
  },
  password: {
    message:
      'La contraseña es requerida y debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números',
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  },
};
export const useRegister = () => {
  const { form, onChange, errors, handleBlur, touched } =
    useForm<FormDataRegister>(inicialState, validators);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const handleTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    if (showTermsError && !acceptTerms) {
      setShowTermsError(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);

    try {
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Ha ocurrido un error durante el registro',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData: form,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    acceptTerms,
    isLoading,
    showTermsError,
    setShowPassword,
    setShowConfirmPassword,
    handleBlur,
    onChange,
    handleTermsChange,
    handleRegister,
  };
};
