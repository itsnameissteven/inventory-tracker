import api from './axios';

export const getItems = async () => {
  const items = await api.get<Item[]>('/items');
  return items;
};
