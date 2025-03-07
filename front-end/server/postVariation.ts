import api from './axios';

export const postVariation = async (
  variation: PickRequired<Variation, 'name'>
) => {
  const response = await api.post<Variation>('/variations', variation);
  return response;
};
