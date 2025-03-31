import type { Route } from './+types/home';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { ItemForm } from '~/components/ItemForm';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  let { data: items } = await getAll<Item>('items');
  let { data: categories } = await getAll<Category>('categories');
  return { items, categories };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Inventory Dashboard</h1>
      <DataTable
        title="Items"
        columns={[
          { header: 'Name', accessKey: 'name' },
          { header: 'Description', accessKey: 'description' },
          {
            header: 'Skus',
            accessKey: 'skus',
            render: (data) => data.skus.length.toString(),
          },
          {
            header: 'Categories',
            accessKey: 'categories',
            render: (data) => data.categories.length.toString(),
          },
          {
            header: 'Variations',
            accessKey: 'variations',
            render: (data) => data.variations.length.toString(),
          },
          {
            header: 'Attributes',
            accessKey: 'attributes',
            render: (data) => data.attributes.length.toString(),
          },
          {
            header: 'Images',
            accessKey: 'images',
            render: (data) => data.images.length.toString(),
          },
          {
            header: 'Created At',
            accessKey: 'createdAt',
            render: (data) => formatDate(data.createdAt),
          },
          {
            header: 'Updated At',
            accessKey: 'updatedAt',
            render: (data) => formatDate(data.updatedAt),
          },
          {
            header: '',
            accessKey: 'id',
            render: (data) => <TableActionButton itemId={data.id} />,
          },
        ]}
        data={loaderData.items}
      />
      <ItemForm categories={loaderData.categories} />
    </Layout>
  );
}
