import api from './axios';

export const getVariations = async () => {
  return await api.get<Variation[]>('/variations');
};
