import axios from 'axios';

interface IError {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: unknown;
}

const backendApi = axios.create({
  baseURL: 'http://192.168.1.3:3000',
});

backendApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data) {
      if (error.response?.data.errors) {
        const listMsg: string[] = error.response?.data.errors.map(
          ({ msg }: IError) => msg,
        );
        return Promise.reject(new Error(listMsg.join(', ')));
      }
      return Promise.reject(new Error(error.response?.data.message));
    } else {
      return Promise.reject(
        new Error(
          'Error interno del servidor, cominiquese con el administrador.',
        ),
      );
    }
  },
);

export { backendApi };
