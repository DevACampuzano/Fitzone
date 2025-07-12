interface UserStoreState {
  user: {
    id: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
  };
  token: string | null;
}
interface UserStoreActions {
  setUser: (user: UserStoreState['user']) => void;
  setToken: (token: string | null) => void;
  getUser: () => UserStoreState['user'];
  getToken: () => string | null;
  clearUser: () => void;
}
