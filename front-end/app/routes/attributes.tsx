import type { Route } from './+types/attributes';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { BaseForm } from '~/components/forms/BaseForm';
import { postAttribute } from 'server/postAttribute';
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
  const { data } = await getAll<Attribute>('attributes');
  return { data };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  await postAttribute({
    name: formData.get('name') as string,
  });
  return null;
}

export default function attributes({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader header="Attributes" buttonContent="Create Attribute">
        {(closeModal) => (
          <BaseForm
            title="Create Attribute"
            actionPath="/attributes"
            onSubmitConfirm={closeModal}
          />
        )}
      </PageHeader>
      <DataTable
        noDataMessage="No attributes found, start adding attributes."
        header="Attributes Table"
        title="Attributes"
        columns={[
          {
            header: 'Name',
            accessKey: 'name',
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
                    label: 'Edit Attribute',
                    onClick: () => navigate('/attributes/' + data.id + '/edit'),
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
