import { backendApi } from '../common/api/backend';

const getClasses = async (
  limit?: number,
  offset?: number,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());
  return await backendApi
    .get('/schedules?' + params.toString(), { signal })
    .then(response => response.data);
};

const getMySchedule = async (signal?: AbortSignal) => {
  return await backendApi
    .get('/schedules/get-my-schedules', { signal })
    .then(response => response.data);
};

const getMyStats = async (signal?: AbortSignal) => {
  return await backendApi
    .get('/schedules/get-my-stats', { signal })
    .then(response => response.data);
};

const getScheduleById = async (id: number, signal?: AbortSignal) => {
  return await backendApi
    .get(`/schedules/${id}`, { signal })
    .then(response => response.data);
};

const payReservation = async (id_schedule: number) => {
  return await backendApi
    .post('/schedules/pay-reservation', { id_schedule })
    .then(response => response.data);
};

export const classActions = {
  getClasses,
  getMySchedule,
  getMyStats,
  payReservation,
  getScheduleById,
};
