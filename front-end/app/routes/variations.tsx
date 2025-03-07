import type { Route } from './+types/variations';
import { Layout } from '~/components/Layout';
import { postItem } from 'server/postItem';
import { getItemById } from 'server/getItemById';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getVariations } from 'server/getVariations';
import { VariationForm } from '~/components/VariationForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getVariations();
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  // await postItem({
  //   name: formData.get('name') as string,
  //   description: formData.get('description') as string,
  // });
  return null;
}

export default function variations({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Variations</h1>
      {data.length === 0 && (
        <p>There are no variations, start adding new variations below</p>
      )}
      <VariationForm />
      {/* <DataTable
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
      /> */}
    </Layout>
  );
}
