import type { Route } from './+types/item';
import { Layout } from '~/components/Layout';
import { postItem } from 'server/postItem';
import { getItemById } from 'server/getItemById';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getItemById(params.id);
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await postItem({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  });
  return null;
}

export default function item({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  console.log(data);
  return (
    <Layout>
      <h1 className="text-5xl font-bold">{data.name}</h1>
      <p>{data.description}</p>
      <DataTable
        title="Items SKUs"
        columns={[
          {
            header: 'Variation',
            accessKey: 'variation',
            render: (data) => data.variation?.name || 'N/A',
          },
          {
            header: 'Attribute',
            accessKey: 'attribute',
            render: (data) => data.attribute?.name || 'N/A',
          },
          { header: 'Price', accessKey: 'price' },
          { header: 'Stock', accessKey: 'stock' },
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
        data={data.skus}
      />
    </Layout>
  );
}
