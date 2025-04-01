import type { Route } from './+types/categoryEdit';
import { Layout } from '~/components/Layout';
import { BaseForm } from '~/components/forms/BaseForm';
import { redirect } from 'react-router';
import { getById } from 'server/getById';
import { updateEntity } from 'server/updateEntity';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getById<Category>('categories', params.id);
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await updateEntity<Category>(`categories/${params.id}`, {
    name: formData.get('name') as string,
  });
  return redirect('/categories');
}

export default function categoryEdit({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Category</h1>
      <p>⚠️ Any Changes made will reflect in all items using this category.</p>
      <BaseForm
        isEdit
        title={'Category'}
        actionPath={`/categories/${data.id}/edit`}
        defaultValues={{ name: data.name }}
      />
    </Layout>
  );
}
