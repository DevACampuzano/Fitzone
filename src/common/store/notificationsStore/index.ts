import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
const initialState: NotificationsStoreState = {
  notifications: [],
  isLoading: false,
};

const storeApi: StateCreator<
  NotificationsStore,
  [['zustand/immer', never]],
  []
> = (set, get) => ({
  ...initialState,
  addNotification: notification => {
    set(state => {
      state.notifications.push(notification);
    });
  },
  getNotifications: () => {
    return get().notifications;
  },
  removeNotification: id => {
    set(state => {
      state.notifications = state.notifications.filter(
        (n, index) => index !== id,
      );
    });
  },
  clearNotifications: () => {
    set(state => {
      state.notifications = [];
    });
  },
  setLoading: isLoading => {
    set(state => {
      state.isLoading = isLoading;
    });
  },
});

export const useNotificationsStore = create<NotificationsStore>()(
  devtools(
    persist(immer(storeApi), {
      name: 'notifications-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }),
  ),
);
