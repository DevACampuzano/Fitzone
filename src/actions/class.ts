import { backendApi } from '../common/api/backend';

const getClasses = async (
  limit: number,
  offset: number = 0,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  return await backendApi
    .get('/schedules?' + params.toString(), { signal })
    .then(response => response.data);
};

export const classActions = { getClasses };
