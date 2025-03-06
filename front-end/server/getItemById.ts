import api from './axios';

export const getItemById = async (id?: string) => {
  const items = await api.get<Item>('/items/' + id);
  return items;
};
