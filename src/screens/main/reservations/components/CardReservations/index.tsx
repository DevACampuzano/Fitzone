import Icon from '@react-native-vector-icons/ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
export const CardReservations: React.FC<CardReservationsProps> = ({
  booking,
  handleCancelBooking,
  showActions = false,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.className}>{booking.className}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(booking.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
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
      {/* selectedTab === 'upcoming'  */}
      {showActions && booking.status === 'confirmed' && (
        <View style={styles.bookingActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCancelBooking(booking)}
            activeOpacity={0.7}
          >
            <Icon name="close-outline" size={16} color="#F44336" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryActionButton}>
            <Icon name="checkmark-outline" size={16} color="#FFF" />
            <Text style={styles.primaryActionText}>Confirmar Asistencia</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
