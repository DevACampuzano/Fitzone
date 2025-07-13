interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

type TabBarScreenMain = {
  Home: undefined;
  Class: NavigatorScreenParams<ClassRouterScreen> | undefined;
  Reservations: undefined;
  Profile: undefined;
};

type AppRouterScreen = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type ClassRouterScreen = {
  list: undefined;
  ClassDetail: {
    id: number;
  };
};
