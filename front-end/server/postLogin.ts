import api from './axios';

export const postLogin = async (login: Login) => {
  const response = await api.post<LoginResponse>('/auth/login', login);
  return response;
};
