import api from './axios';

export const postItem = async (
  item: PickRequired<Item, 'name' | 'description'>
) => {
  const response = await api.post<Item>('/items', item);
  console.log(response);
  return response;
};
