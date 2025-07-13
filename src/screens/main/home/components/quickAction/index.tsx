import Icon from '@react-native-vector-icons/ionicons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export const QuickAction: React.FC<QuickActionProps> = ({
  id,
  title,
  icon,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: color }]}
      onPress={() => onPress?.(id)}
      activeOpacity={0.7}
    >
      <Icon name={icon as any} size={28} color="#FFF" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );
};
