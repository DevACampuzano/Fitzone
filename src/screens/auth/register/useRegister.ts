import { useContext, useState } from 'react';
import { useForm } from '../../../common/hooks';
import { useMutation } from '@tanstack/react-query';
import { UserActions } from '../../../actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ToastContext } from '../../../common/store';

const inicialState: FormDataRegister = {
  name: 'test',
  lastName: 'test',
  email: 'a@a.c',
  phone: '',
  password: '1234',
  confirmPassword: '1234',
};
const validators: ValidateProps<FormDataRegister> = {
  name: {
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
    validate: /^(|[0-9]{10})$/,
  },
  // password: {
  //   message:
  //     'La contraseña es requerida y debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números',
  //   validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  // },
};
export const useRegister = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AppRouterScreen, 'Register', undefined>;
}) => {
  const { form, onChange, errors, handleBlur, touched } =
    useForm<FormDataRegister>(inicialState, validators);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const { showToast } = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (data: FormDataRegister) => UserActions.register(data),
    onMutate: async () => {
      const result = Object.keys(validators).filter(key =>
        handleBlur(key as keyof FormDataRegister),
      );
      if (form.password !== form.confirmPassword) {
        result.push('confirmPassword');
      }
      if (result.length > 0) {
        throw new Error(
          'Por favor, corrige los campos inválidos antes de continuar.',
        );
      }
    },
    onError: (error: Error) => {
      console.log(error);
      showToast(error.message, 'warning-sharp');
    },
    onSuccess: () => {
      showToast(
        'Registro exitoso. Por favor, verifica tu correo electrónico.',
        'checkmark-circle-outline',
      );

      navigation.goBack();
    },
  });

  const handleTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    if (showTermsError && !acceptTerms) {
      setShowTermsError(false);
    }
  };

  return {
    formData: form,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    acceptTerms,
    isLoading: mutation.isPending,
    showTermsError,
    setShowPassword,
    setShowConfirmPassword,
    handleBlur,
    onChange,
    handleTermsChange,
    handleRegister: mutation.mutate,
    mutation,
  };
};
