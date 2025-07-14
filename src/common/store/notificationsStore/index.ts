import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
const initialState: NotificationsStoreState = {
  notifications: [],
  statusPermission: PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
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
      state.notifications = state.notifications.filter(n => n.id !== id);
    });
  },
  clearNotifications: () => {
    set(state => {
      state.notifications = [];
    });
  },
  setStatusPermission: status => {
    set(state => {
      state.statusPermission = status;
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
