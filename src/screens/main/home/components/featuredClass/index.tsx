import Icon from '@react-native-vector-icons/ionicons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export const FeaturedClass: React.FC<FeaturedClassProps> = ({
  id,
  name,
  time,
  image,
  onPress,
  spots,
}) => {
  return (
    <TouchableOpacity
      key={id}
      style={styles.featuredCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{name}</Text>
        <View style={styles.featuredFooter}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {new Date(time).toLocaleTimeString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{spots} cupos</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
