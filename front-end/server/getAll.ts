import api from './axios';

export const getAll = async <T>(path: string) => {
  return await api.get<T[]>(path);
};
