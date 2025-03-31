import type { Route } from './+types/categoryEdit';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { BaseForm } from '~/components/BaseForm';
import { postCategory } from 'server/postCategory';
import { redirect, useNavigate } from 'react-router';
import { getById } from 'server/getById';
import { updateCategory } from 'server/updateCategory';

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
  if (params.id) {
    await updateCategory(params.id, {
      name: formData.get('name') as string,
    });
  }
  return redirect('/categories');
}

export default function categoryEdit({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Category</h1>
      <p>⚠️ Any Changes made will reflect in all items using this category.</p>
      <BaseForm
        title={'Category'}
        actionPath={`/categories/${data.id}/edit`}
        defaultValues={{ name: data.name }}
      />
    </Layout>
  );
}
