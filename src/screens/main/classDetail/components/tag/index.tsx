import { Text, View } from 'react-native';
import styles from './styles';

export const Tag: React.FC<{
  tag: string;
}> = ({ tag }) => (
  <View style={styles.equipmentTag}>
    <Text style={styles.equipmentText}>{tag}</Text>
  </View>
);
