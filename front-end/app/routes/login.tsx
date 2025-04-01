import { Form, redirect, useSubmit, type MetaFunction } from 'react-router';
import type { Route } from './+types/login';
import { createUserSession, getUserToken } from '~/services/session.server';
import { postLogin } from 'server/postLogin';
import { Layout } from '~/components/Layout';
import { z } from 'zod';
import { DatabaseForm } from '~/components/forms/DatabaseForm';
import { Field } from 'types/Field';
import { auth } from '~/services/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  await auth(request);
  const userId = await getUserToken(request);
  if (userId) {
    return redirect('/');
  }
}

export async function action({ request }: Route.ActionArgs) {
  let response: Response;
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const { data } = await postLogin({ username, password });
    // Create a session
    response = await createUserSession({
      request,
      userToken: data.token,
      remember: true,
    });
    if (!response) {
      throw new Error('An error occurred while creating the session');
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function Login({}: Route.ComponentProps) {
  const submit = useSubmit();
  const fields: Field<typeof formSchema>[] = [
    {
      name: 'username',
      label: `Username`,
      placeHolder: `Username`,
      type: 'text',
    },
    {
      name: 'password',
      label: `Password`,
      placeHolder: `Password`,
      type: 'password',
    },
  ];
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(values, { method: 'POST', action: '/login' });
  };
  return (
    <Layout>
      <DatabaseForm
        withStyle={true}
        title="Login"
        fields={fields}
        formSchema={formSchema}
        onSubmit={onSubmit}
        defaultValues={{ username: 'InventoryUser', password: 'password303' }}
      />
    </Layout>
  );
}
