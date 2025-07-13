import Icon from '@react-native-vector-icons/ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export const MenuItem: React.FC<MenuItemProps> = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Icon name={icon as any} size={20} color="#666" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
};
