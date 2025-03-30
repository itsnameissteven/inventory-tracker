import api from './axios';

export const postAttribute = async (
  attribute: PickRequired<Attribute, 'name'>
) => {
  const response = await api.post<Attribute>('/attributes', attribute);
  return response;
};
