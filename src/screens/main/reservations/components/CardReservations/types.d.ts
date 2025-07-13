interface CardReservationsProps {
  booking: Booking;
  handleCancelBooking: (booking: Booking) => void;
  showActions?: boolean;
}
