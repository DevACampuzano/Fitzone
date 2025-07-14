import { backendApi } from '../common/api/backend';

const addFCMToken = async (token: string) => {
  return await backendApi
    .post('/notifications/add-fcm-token', { token })
    .then(response => response.data);
};

const notificationsTest = async () => {
  return await backendApi.get('/notifications').then(response => response.data);
};

export const notificationActions = {
  addFCMToken,
  notificationsTest,
};
