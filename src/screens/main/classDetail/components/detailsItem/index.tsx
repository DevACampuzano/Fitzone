import Icon from '@react-native-vector-icons/ionicons';
import { Text, View } from 'react-native';
import styles from './styles';

export const DetailsItem: React.FC<DetailsItemProps> = ({
  value,
  label,
  icon,
}) => (
  <View style={styles.detailItem}>
    <Icon name={icon as any} size={20} color="#FF6B35" />
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);
