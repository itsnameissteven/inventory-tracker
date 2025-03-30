import type { Route } from './+types/variations';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { VariationForm } from '~/components/VariationForm';
import { postVariation } from 'server/postVariation';
import { getAll } from 'server/getAll';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getAll<Variation>('variations');
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await postVariation({
    name: formData.get('name') as string,
    displayName: formData.get('displayName') as string,
  });
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
      <DataTable
        title="Variations"
        columns={[
          {
            header: 'Name',
            accessKey: 'name',
          },
          { header: 'Display Name', accessKey: 'displayName' },
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
        data={data}
      />
    </Layout>
  );
}
