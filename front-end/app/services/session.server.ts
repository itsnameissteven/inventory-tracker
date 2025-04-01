import { createCookieSessionStorage, redirect } from 'react-router';
import { setAuthToken } from 'server/axios';

type User = { id: string; username: string; password: string };

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: ['s3cret'],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { commitSession, destroySession } = sessionStorage;

const getUserSession = async (request: Request) => {
  const cookie = await sessionStorage.getSession(request.headers.get('Cookie'));
  return cookie;
};

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

const USER_SESSION_KEY = 'userToken';

export async function getUserToken(
  request: Request
): Promise<User['id'] | undefined> {
  const session = await getUserSession(request);
  const userToken = session.get(USER_SESSION_KEY);
  return userToken;
}

export async function createUserSession({
  request,
  userToken,
  remember = true,
  redirectUrl,
}: {
  request: Request;
  userToken: string;
  remember: boolean;
  redirectUrl?: string;
}) {
  const session = await getUserSession(request);
  session.set(USER_SESSION_KEY, userToken);
  return redirect(redirectUrl || '/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}
