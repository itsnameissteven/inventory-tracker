import { setAuthToken } from 'server/axios';
import { getUserToken } from './session.server';
import { redirect } from 'react-router';

export const auth = async (request: Request) => {
  const userId = await getUserToken(request);
  setAuthToken(userId);
  if (!userId) {
    throw redirect('/login');
  }
};
