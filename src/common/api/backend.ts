import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface IError {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: unknown;
}

const backendApi = axios.create({
  baseURL: __DEV__
    ? 'http://192.168.1.3:3000'
    : 'https://5rq3k7m3-3000.use.devtunnels.ms',
});

backendApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.data) {
      if (error.response?.data.errors) {
        const listMsg: string[] = error.response?.data.errors.map(
          ({ msg }: IError) => msg,
        );
        return Promise.reject(new Error(listMsg.join(', ')));
      }
      const message = error.response.data.message || 'Error desconocido';
      return Promise.reject(new Error(message));
    } else {
      return Promise.reject(
        new Error(
          'Error interno del servidor, cominiquese con el administrador.',
        ),
      );
    }
  },
);

backendApi.interceptors.request.use(
  async config => {
    const userStorageJson = await AsyncStorage.getItem('user-storage');
    if (userStorageJson) {
      const userStorage = JSON.parse(userStorageJson);
      if (userStorage.state.token) {
        config.headers['access-token'] = userStorage.state.token;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { backendApi };
