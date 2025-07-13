import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store';

export const useErrorsToken = () => {
  const navigation = useNavigation();
  const onClose = useUserStore(state => state.clearUser);

  const validateError = (error: string) => {
    switch (error) {
      case 'INVALID-TOKEN':
        onClose();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
        return 'Se ha cerrado la sesión por seguridad, por favor inicia sesión nuevamente';
      case 'NOT-PROVIDED-TOKEN':
        return 'Se requiere un token de acceso para continuar';
      default:
        return error;
    }
  };
  return {
    validateError,
  };
};
