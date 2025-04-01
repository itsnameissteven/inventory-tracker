import type { Route } from './+types/itemEdit';
import { Layout } from '~/components/Layout';
import { getById } from 'server/getById';
import { redirect } from 'react-router';
import { updateEntity } from 'server/updateEntity';
import { ItemForm } from '~/components/forms/ItemForm';
import { getAll } from 'server/getAll';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { data: item } = await getById<Item>('items', params.id);
  const { data: categories } = await getAll<Category>('categories');
  return { item, categories };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await updateEntity<Item & { categoryIds: string[] }>(`/items/${params.id}`, {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    categoryIds: (formData.get('categories') as string).split(','),
  });
  return redirect('/');
}

export default function itemEdit({ loaderData }: Route.ComponentProps) {
  const { item, categories } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Item</h1>
      <ItemForm
        isEdit
        defaultValues={{
          name: item.name,
          description: item.description,
          categories: item.categories.map((c) => c.id),
        }}
        categories={categories}
        actionPath={`/item/${item.id}/edit`}
      />
    </Layout>
  );
}
