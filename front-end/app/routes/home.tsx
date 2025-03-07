import type { Route } from './+types/home';
import { getItems } from 'server/getItems';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { ItemForm } from '~/components/ItemForm';
import { postItem } from 'server/postItem';
import { formatDate } from '~/utils/formatDate';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getItems();
  return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Welcome</h1>
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
        data={loaderData.data}
      />
      <ItemForm />
    </Layout>
  );
}
