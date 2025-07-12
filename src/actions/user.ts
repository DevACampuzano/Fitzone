import { backendApi } from '../common/api/backend';

const login = async (email: string, password: string) => {
  return await backendApi.post('/users/login', { email, password });
};
const register = async (data: FormDataRegister) => {
  return await backendApi.post('/users/create', data);
};

export const UserActions = {
  login,
  register,
};
