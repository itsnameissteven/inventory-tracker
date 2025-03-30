import api from './axios';

export const postItem = async (
  item: PickRequired<Item, 'name' | 'description'> & { categoryIds: string[] }
) => {
  const response = await api.post<Item>('/items/with-categories', item);
  return response;
};
