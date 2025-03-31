import api from './axios';

export const updateCategory = async (
  id: string,
  category: PickRequired<Category, 'name'>
) => {
  const response = await api.put<Category>(`/categories/${id}`, category);
  return response;
};
