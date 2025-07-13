import { Text, View } from 'react-native';
import styles from './styles';

export const Loading: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Cargando detalles...</Text>
    </View>
  </View>
);
