/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { classActions } from '../../../actions';
import { ToastContext } from '../../../common/store';
import { useErrorsToken } from '../../../common/helpers';

const useReservations = () => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>(
    'upcoming',
  );

  const { showToast } = useContext(ToastContext);
  const { validateError } = useErrorsToken();
  const {
    data: { data: bookings },
    isLoading: refreshing,
    refetch: onRefresh,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: ({ signal }) => classActions.getMySchedule(signal),
    initialData: {
      status: true,
      data: [],
    },
  });

  const isUpcoming = (date: string) => {
    const today = new Date();
    const [day, month, year] = date.split('/');
    const bookingDate = new Date(Number(year), Number(month) - 1, Number(day));
    return bookingDate >= today;
  };

  useEffect(() => {
    if (error) {
      const msg = validateError(error.message);
      showToast(msg, 'warning-sharp');
    }
  }, [error]);

  const filteredBookings = bookings.filter((booking: Booking) => {
    if (selectedTab === 'upcoming') {
      return isUpcoming(booking.date);
    } else {
      console.log('Bookings:', bookings);
      return !isUpcoming(booking.date);
    }
  });

  return {
    filteredBookings,
    refreshing,
    selectedTab,
    setSelectedTab,
    onRefresh,
  };
};

export default useReservations;
