import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://192.168.1.3:3000/api',
});

export { backendApi };
