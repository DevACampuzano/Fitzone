import { backendApi } from '../common/api/backend';
const getAllCategories = async (signal?: AbortSignal) => {
  return await backendApi
    .get('/categories', { signal })
    .then(response => response.data);
};

export const categoryActions = {
  getAllCategories,
};
