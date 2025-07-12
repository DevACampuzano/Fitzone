interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

type TabBarScreenMain = {
  Home: undefined;
  Class: undefined;
  Reservations: undefined;
  Profile: undefined;
};

type AppRouterScreen = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  ClassDetail: undefined;
};

type AppRouterScreenProps<S extends keyof AppRouterScreen> =
  NativeStackScreenProps<AppRouterScreen, S>;
