import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialState: UserStoreState = {
  user: {
    id: '',
    email: '',
    name: '',
    lastName: '',
    phone: '',
  },
  token: null,
};

type UserStore = UserStoreState & UserStoreActions;

const storeApi: StateCreator<UserStore> = (set, get) => ({
  ...initialState,
  setUser: user => set({ user }),
  setToken: token => set({ token }),
  clearUser: () => set(initialState),
  getUser: () => get().user,
  getToken: () => get().token,
});

export const useUserStore = create<UserStore>()(
  devtools(
    persist(immer(storeApi), {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }),
  ),
);
