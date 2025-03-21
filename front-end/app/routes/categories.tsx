import type { Route } from './+types/categories';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { getAll } from 'server/getAll';
import { BaseForm } from '~/components/BaseForm';
import { postAttribute } from 'server/postAttribute';
import { postCategory } from 'server/postCategory';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  let { data } = await getAll<Category>('categories');
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
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Categories</h1>
      {data.length === 0 && (
        <p>There are no categories, start adding new categories below</p>
      )}
      <BaseForm title={'Category'} actionPath={'/categories'} />
      <DataTable
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
            render: (data) => <TableActionButton itemId={data.id} />,
          },
        ]}
        data={data}
      />
    </Layout>
  );
}
