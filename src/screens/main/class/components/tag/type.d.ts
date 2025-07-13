interface TagProps {
  tag: string;
  onPress: (tag: string) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}
