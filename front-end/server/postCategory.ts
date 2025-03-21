import api from './axios';

export const postCategory = async (
  category: PickRequired<Category, 'name'>
) => {
  const response = await api.post<Category>('/categories', category);
  return response;
};
