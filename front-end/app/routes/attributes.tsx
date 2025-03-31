import type { Route } from './+types/attributes';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { BaseForm } from '~/components/BaseForm';
import { postAttribute } from 'server/postAttribute';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader() {
  let { data } = await getAll<Attribute>('attributes');
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
      <h1 className="text-5xl font-bold">Attributes</h1>
      {data.length === 0 && (
        <p>There are no attributes, start adding new attributes below</p>
      )}
      <BaseForm title="Create Attribute" actionPath="/attributes" />
      {data.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Attributes Table</h2>
          <DataTable
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
                        onClick: () =>
                          navigate('/attributes/' + data.id + '/edit'),
                      },
                    ]}
                  />
                ),
              },
            ]}
            data={data}
          />
        </>
      )}
    </Layout>
  );
}
