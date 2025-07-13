import Icon from '@react-native-vector-icons/ionicons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export const CardClass: React.FC<CardClassProps> = ({
  onPress,
  id,
  image,
  name,
  difficulty,
  time,
  duration,
  spots,
  maxSpots,
  price,
}) => {
  const getDifficultyColor = (
    diff: 'Principiante' | 'Intermedio' | 'Avanzado',
  ) => {
    switch (diff) {
      case 'Principiante':
        return '#96CEB4';
      case 'Intermedio':
        return '#FECA57';
      case 'Avanzado':
        return '#FF6B6B';
      default:
        return '#999';
    }
  };
  return (
    <TouchableOpacity
      style={styles.classCard}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: image }} style={styles.classImage} />
      <View style={styles.classContent}>
        <View style={styles.classHeader}>
          <Text style={styles.className}>{name}</Text>
          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor: getDifficultyColor(difficulty),
              },
            ]}
          >
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>
        <View style={styles.classDetails}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="timer-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{duration} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {spots}/{maxSpots}
            </Text>
          </View>
        </View>

        <View style={styles.classFooter}>
          <Text style={styles.classPrice}>${price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
