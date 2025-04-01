import type { Route } from './+types/categories';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { BaseForm } from '~/components/forms/BaseForm';
import { postCategory } from 'server/postCategory';
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
  const { data } = await getAll<Category>('categories');
  return { data };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  await postCategory({
    name: formData.get('name') as string,
  });
  return null;
}

export default function categories({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader header="Categories" buttonContent="Create Category">
        {(closeModal) => (
          <BaseForm
            title="Create Category"
            actionPath="/categories"
            onSubmitConfirm={closeModal}
          />
        )}
      </PageHeader>
      <DataTable
        noDataMessage="No categories found, start adding categories."
        header="Categories Table"
        title="Categories"
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
                    label: 'Edit Category',
                    onClick: () => navigate(`/categories/${data.id}/edit`),
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
