import type { Route } from './+types/variations';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { VariationForm } from '~/components/forms/VariationForm';
import { postVariation } from 'server/postVariation';
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
  const { data } = await getAll<Variation>('variations');
  return { data };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  await postVariation({
    name: formData.get('name') as string,
    displayName: formData.get('displayName') as string,
  });
  return null;
}

export default function variations({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader header="Variations" buttonContent="Create Variation">
        {(closeModal) => <VariationForm onSubmitConfirm={closeModal} />}
      </PageHeader>
      <DataTable
        header="Variations Table"
        noDataMessage="No variations found, start adding variations."
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
            render: (data) => (
              <TableActionButton
                actions={[
                  {
                    label: 'Edit Variation',
                    onClick: () => navigate('/variations/' + data.id + '/edit'),
                  },
                ]}
              />
            ),
          },
        ]}
        data={data}
      />
    </Layout>
  );
}
