/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { useNotificationsStore } from '../store/notificationsStore';
import {
  AppState,
  AppStateStatus,
  PermissionsAndroid,
  Platform,
} from 'react-native';

export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  } else {
    console.log('Failed', 'No token received');
  }
};

export const handleCheckNotifications = async () => {
  if (Platform.OS === 'ios') {
    const authorizationStatus = await messaging().hasPermission();

    return authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED;
  } else {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
};

export const useListenNotification = () => {
  const [channelId, setChannelId] = useState('');
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const addNotification = useNotificationsStore(state => state.addNotification);
  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        try {
          const { notification } = remoteMessage;
          const newNotification: Notification = {
            body: notification?.body || '',
            title: notification?.title || '',
            timestamp: new Date(),
            read: false,
          };

          addNotification(newNotification);
        } catch (error) {
          console.error(error);
        }
      },
    );
    return () => unsubscribe;
  };

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        try {
          const { notification } = remoteMessage;

          const newNotification: Notification = {
            body: notification?.body || '',
            title: notification?.title || '',
            timestamp: new Date(),
            read: false,
          };

          addNotification(newNotification);
        } catch (error) {
          console.error(error);
        }
      },
    );
    return unsubscribe;
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      if (unsubscribeRef.current) unsubscribeRef.current();
      unsubscribeRef.current = await listenToForegroundNotifications();
    } else {
      if (unsubscribeRef.current) unsubscribeRef.current();
      unsubscribeRef.current = await listenToBackgroundNotifications();
    }
  };

  useEffect(() => {
    const getChannelId = async () => {
      //   await notifee.createChannel({
      //     id: 'general',
      //     name: 'Fondo del Ojo App',
      //     sound: 'notifications',
      //     vibration: true,
      //     lightColor: AndroidColor.AQUA,
      //     importance: AndroidImportance.HIGH,
      //   });

      setChannelId('general');
    };
    getChannelId();
  }, []);

  useEffect(() => {
    if (channelId) {
      const subscription = AppState.addEventListener(
        'change',
        handleAppStateChange,
      );
      handleAppStateChange(AppState.currentState);

      return () => {
        subscription.remove();
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
      };
    }
  }, [channelId]);
};
