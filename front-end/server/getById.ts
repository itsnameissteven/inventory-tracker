import api from './axios';

export const getById = async <T>(path: string, id?: string) => {
  return await api.get<T>(path + `/${id}`);
};
