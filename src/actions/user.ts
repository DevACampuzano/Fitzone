import { backendApi } from '../common/api/backend';

const login = async (email: string, password: string) => {
  return await backendApi.post('/users/login', { email, password });
};
const register = async (data: FormDataRegister) => {
  return await backendApi.post('/users/create', data);
};

const getMyProgress = async (signal?: AbortSignal) => {
  return await backendApi
    .get('/users/get-my-progress', { signal })
    .then(response => response.data);
};

export const UserActions = {
  login,
  register,
  getMyProgress,
};
