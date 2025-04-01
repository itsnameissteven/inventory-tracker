import type { Route } from './+types/skus';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { useNavigate } from 'react-router';
import { auth } from '~/services/auth.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await auth(request);
  const { data } = await getAll<Sku>('item-skus');
  return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  return (
    <Layout>
      <h1 className="text-5xl font-bold mb-10">Item SKUs</h1>
      <DataTable
        noDataMessage="No SKUs found, add a sku to an item and it will appear here."
        header="SKUs Table"
        title="SKUs"
        columns={[
          { header: 'Price', accessKey: 'price' },
          { header: 'Stock', accessKey: 'stock' },
          {
            header: 'Item Name',
            accessKey: 'itemId',
          },
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
            render: (data) => (
              <TableActionButton
                actions={[
                  {
                    label: 'Edit SKU',
                    onClick: () => navigate('/skus/' + data.id + '/edit'),
                  },
                ]}
              />
            ),
          },
        ]}
        data={loaderData.data}
      />
    </Layout>
  );
}
