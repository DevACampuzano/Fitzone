import { useContext } from 'react';
import { Alert } from 'react-native';
import { ToastContext } from '../../../common/store';

const data: ClassDetail = {
  id: 1,
  name: 'CrossFit Matutino',
  description:
    'Una clase intensa de CrossFit diseñada para mejorar tu fuerza, resistencia y agilidad. Combina ejercicios de cardio y fuerza en un ambiente motivador y desafiante. Perfecto para quemar calorías y tonificar todo el cuerpo.',
  time: '07:00 AM',
  date: '2024-01-15',
  duration: 60,
  difficulty: 'Intermedio',
  spots: 5,
  maxSpots: 15,
  price: 25000,
  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
  location: 'FitZone Sede Norte',
  equipment: [
    'Barras',
    'Mancuernas',
    'Kettlebells',
    'Cuerdas',
    'Cajas pliométricas',
  ],
  benefits: [
    'Mejora la fuerza y resistencia',
    'Quema hasta 500 calorías por sesión',
    'Tonifica todo el cuerpo',
    'Mejora la coordinación',
    'Aumenta la confianza',
  ],
  requirements: [
    'Nivel básico de condición física',
    'Ropa deportiva cómoda',
    'Toalla',
    'Botella de agua',
  ],
};
export default (_: number) => {
  const { showToast } = useContext(ToastContext);

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
            showToast(
              'Reserva exitosa, tu clase ha sido reservada correctamente',
              'checkmark-circle-outline',
            );
            // navigation.goBack();
          },
        },
      ],
    );
  };

  return {
    classDetail: data,
    isLoading: false,
    loadClassDetail: () => {},
    handleBookClass,
  };
};
