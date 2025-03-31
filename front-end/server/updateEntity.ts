import api from './axios';

export const updateEntity = async <T>(path: string, entity: Partial<T>) => {
  const response = await api.put<T>(path, entity);
  return response;
};
