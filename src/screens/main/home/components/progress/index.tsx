import { Text, View } from 'react-native';
import styles from './styles';

export const Progress: React.FC<ProgressProps> = ({ number, label }) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};
