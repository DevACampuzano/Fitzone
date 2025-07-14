import Icon from '@react-native-vector-icons/ionicons';
import { Text, View, Image } from 'react-native';
import styles from './styles';
export const CardReservations: React.FC<CardReservationsProps> = ({
  booking,
}) => {
  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingDetails}>
        <Text style={styles.className}>{booking.className}</Text>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="card-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            ${booking.price.toLocaleString()}
          </Text>
        </View>
      </View>
      <Image source={{ uri: booking.image }} style={styles.bookingImage} />
    </View>
  );
};
