import api from './axios';

export const updateVariation = async (
  id: string,
  variation: Partial<Variation>
) => {
  const response = await api.put<Variation>(`/variations/${id}`, variation);
  return response;
};
