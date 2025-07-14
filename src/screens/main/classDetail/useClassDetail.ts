/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { classActions } from '../../../actions';
import { useErrorsToken } from '../../../common/helpers';

const init: ClassDetail = {
  id: 0,
  name: '',
  description: '',
  time: '',
  date: '',
  duration: 0,
  difficulty: 'Principiante',
  spots: 0,
  maxSpots: 0,
  price: 0,
  image: '',
  location: '',
  equipment: [],
  benefits: [],
  requirements: [],
};
export default (id: number) => {
  const { validateError } = useErrorsToken();
  const [toast, setToast] = useState({
    show: false,
    msg: '',
    icon: 'information-circle-outline',
  });

  const {
    data,
    isLoading,
    error: errorDetail,
    refetch: loadClassDetail,
  } = useQuery({
    queryKey: ['classDetail', id],
    queryFn: ({ signal }) => classActions.getScheduleById(id, signal),
    select: d => d.data,
    initialData: init,
  });
  const mutation = useMutation({
    mutationKey: ['payReservation', id],
    mutationFn: (idSchedule: number) => classActions.payReservation(idSchedule),
    onSuccess: () => {
      setToast({
        show: true,
        msg: 'Reserva exitosa, tu clase ha sido reservada correctamente',
        icon: 'checkmark-circle-outline',
      });
      loadClassDetail();
    },
    onError: (error: Error) => {
      console.log(error);
      const msg = validateError(error.message);
      setToast({
        show: true,
        msg,
        icon: 'warning-sharp',
      });
    },
  });

  const handleBookClass = () => {
    if (!data) return;

    if (data.spots === 0) {
      Alert.alert('Clase llena', 'Esta clase no tiene cupos disponibles');
      return;
    }

    Alert.alert(
      'Confirmar Reserva',
      `¿Deseas reservar ${data.name}?\n\nFecha: ${data.date}\nHora: ${
        data.time
      }\nPrecio: $${data.price.toLocaleString()}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reservar',
          onPress: () => {
            mutation.mutate(data.id);
          },
        },
      ],
    );
  };
  useEffect(() => {
    if (errorDetail) {
      const msg = validateError(errorDetail.message);
      setToast({
        show: true,
        msg,
        icon: 'warning-sharp',
      });
    }
  }, [errorDetail]);

  return {
    classDetail: data as ClassDetail,
    isLoading,
    loadClassDetail,
    handleBookClass,
    onCloseToast: () => setToast(state => ({ ...state, show: false })),
    toast,
    isLoadingPay: mutation.isPending,
  };
};
