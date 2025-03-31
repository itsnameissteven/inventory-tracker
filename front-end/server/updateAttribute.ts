import api from './axios';

export const updateAttribute = async (
  id: string,
  attribute: PickRequired<Attribute, 'name'>
) => {
  const response = await api.put<Attribute>(`/attributes/${id}`, attribute);
  return response;
};
