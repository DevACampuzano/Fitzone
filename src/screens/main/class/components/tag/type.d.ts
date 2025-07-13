interface TagProps {
  id: string | number;
  tag: string;
  onPress: (tag: string) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}
