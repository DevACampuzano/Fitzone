interface NotificationsStoreState {
  notifications: Notification[];
  statusPermission: PermissionStatus;
  isLoading: boolean;
}
interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsStoreActions {
  addNotification: (notification: Notification) => void;
  getNotifications: () => Notification[];
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setStatusPermission: (status: 'granted' | 'denied' | 'default') => void;
  setLoading: (isLoading: boolean) => void;
}

type NotificationsStore = NotificationsStoreState & NotificationsStoreActions;
