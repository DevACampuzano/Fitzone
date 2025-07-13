interface Booking {
  id: string;
  className: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  location: string;
  price: number;
}
