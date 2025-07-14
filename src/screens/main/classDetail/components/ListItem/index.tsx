import Icon from '@react-native-vector-icons/ionicons';
import { Text, View } from 'react-native';
import styles from './styles';

export const ListItem: React.FC<ListItemProps> = ({
  title,
  icon,
  iconSize = 24,
  iconColor = '#000',
}) => (
  <View style={styles.itemContainer}>
    <Icon name={icon as any} size={iconSize} color={iconColor} />
    <Text style={styles.itemText}>{title}</Text>
  </View>
);
