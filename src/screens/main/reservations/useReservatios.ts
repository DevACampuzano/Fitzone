import { useState } from 'react';
import { Alert } from 'react-native';

const data: Booking[] = [
  {
    id: '1',
    className: 'CrossFit Matutino',
    date: '2026-01-15',
    time: '07:00 AM',
    status: 'confirmed',
    location: 'Sede Norte',
    price: 25000,
  },
  {
    id: '2',
    className: 'Yoga Relajante',
    date: '2024-01-16',
    time: '06:30 PM',
    status: 'pending',
    location: 'Sede Centro',
    price: 20000,
  },
  {
    id: '3',
    className: 'Spinning Intensivo',
    date: '2024-01-10',
    time: '05:30 PM',
    status: 'confirmed',
    location: 'Sede Sur',
    price: 22000,
  },
];

const useReservations = () => {
  const [bookings, _] = useState<Booking[]>(data);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>(
    'upcoming',
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // await loadBookings();
    setRefreshing(false);
  };

  const handleCancelBooking = (booking: Booking) => {
    Alert.alert(
      'Cancelar Reserva',
      `¿Estás seguro de que quieres cancelar tu reserva para ${booking.className}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para cancelar la reserva
            Alert.alert(
              'Reserva Cancelada',
              'Tu reserva ha sido cancelada exitosamente',
            );
          },
        },
      ],
    );
  };

  const isUpcoming = (date: string) => {
    return new Date(date) >= new Date();
  };

  const filteredBookings = bookings.filter(booking => {
    if (selectedTab === 'upcoming') {
      return isUpcoming(booking.date) && booking.status !== 'cancelled';
    } else {
      return !isUpcoming(booking.date) || booking.status === 'cancelled';
    }
  });

  return {
    filteredBookings,
    refreshing,
    selectedTab,
    setSelectedTab,
    onRefresh,
    handleCancelBooking,
  };
};

export default useReservations;
