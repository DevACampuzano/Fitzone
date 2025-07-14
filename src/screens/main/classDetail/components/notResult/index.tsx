import Icon from '@react-native-vector-icons/ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export const NotResult: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <View style={styles.container}>
    <View style={styles.errorContainer}>
      <Icon name="alert-circle-outline" size={64} color="#FF6B6B" />
      <Text style={styles.errorText}>
        No se pudo cargar la información de la clase
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onPress}>
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  </View>
);
