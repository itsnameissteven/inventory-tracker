import { redirect, useSubmit, type MetaFunction } from 'react-router';
import type { Route } from './+types/login';
import { createUserSession, getUserToken } from '~/services/session.server';
import { postLogin } from 'server/postLogin';
import { Layout } from '~/components/Layout';
import { z } from 'zod';
import { DatabaseForm } from '~/components/forms/DatabaseForm';
import { Field } from 'types/Field';

export const meta: MetaFunction = () => {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
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
    response = await createUserSession({
      request,
      userToken: data.token,
      remember: true,
    });
    if (!response) {
      throw new Error('An error occurred while creating the session');
    }
    return response;
  } catch (error: any) {
    return { error: error.message };
  }
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function Login({ actionData }: Route.ComponentProps) {
  const res = actionData;
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
        error={res?.error}
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
