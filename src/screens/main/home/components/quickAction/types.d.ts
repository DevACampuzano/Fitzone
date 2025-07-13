interface QuickActionProps {
  id: string | number;
  title: string;
  icon: string;
  color: string;
  onPress?: (id: string | number) => void;
}
