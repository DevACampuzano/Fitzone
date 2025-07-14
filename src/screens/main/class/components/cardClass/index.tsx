import Icon from '@react-native-vector-icons/ionicons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { getDifficultyColor } from '../../../../../common/helpers';

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
  const date = new Date(time);
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
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
            <Text
              style={styles.detailText}
            >{`${formattedDate} ${formattedTime}`}</Text>
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
