import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export const Tag: React.FC<TagProps> = ({ tag, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        style,
        // selectedCategory === item && styles.categoryButtonActive,
      ]}
      onPress={() => onPress(tag)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryText,
          //   selectedCategory === item && styles.categoryTextActive,
          textStyle,
        ]}
      >
        {tag}
      </Text>
    </TouchableOpacity>
  );
};
