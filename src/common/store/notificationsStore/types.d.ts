interface NotificationsStoreState {
  notifications: Notification[];
  isLoading: boolean;
}
interface Notification {
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsStoreActions {
  addNotification: (notification: Notification) => void;
  getNotifications: () => Notification[];
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
  setLoading: (isLoading: boolean) => void;
}

type NotificationsStore = NotificationsStoreState & NotificationsStoreActions;
