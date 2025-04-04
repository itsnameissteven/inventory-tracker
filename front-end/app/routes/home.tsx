import type { Route } from './+types/home';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { ItemForm } from '~/components/forms/ItemForm';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { useNavigate } from 'react-router';
import { PageHeader } from '~/components/PageHeader';
import { auth } from '~/services/auth.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await auth(request);
  let { data: items } = await getAll<Item>('items');
  let { data: categories } = await getAll<Category>('categories');
  return { items, categories };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader header="Inventory Dashboard" buttonContent="Create Item">
        {(closeModal) => (
          <ItemForm
            categories={loaderData.categories}
            onSubmitConfirm={closeModal}
          />
        )}
      </PageHeader>
      <DataTable
        noDataMessage="No items found, start adding items."
        header="Items Table"
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
            render: (data) => (
              <TableActionButton
                actions={[
                  {
                    label: 'View Item',
                    onClick: () => navigate('/item/' + data.id),
                  },
                  {
                    label: 'Edit Item',
                    onClick: () => navigate('/item/' + data.id + '/edit'),
                  },
                ]}
              />
            ),
          },
        ]}
        data={loaderData.items}
      />
    </Layout>
  );
}
