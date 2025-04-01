import type { Route } from './+types/item';
import { Layout } from '~/components/Layout';
import { postItem } from 'server/postItem';
import { getItemById } from 'server/getItemById';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { SkuForm } from '~/components/forms/SkuForm';
import { getAll } from 'server/getAll';
import { postSku } from 'server/postSku';
import { useNavigate } from 'react-router';
import { PageHeader } from '~/components/PageHeader';
import { auth } from '~/services/auth.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  await auth(request);
  const { data: item } = await getItemById(params.id);
  const { data: attributes } = await getAll<Attribute>('attributes');
  const { data: variations } = await getAll<Variation>('variations');
  return { item, attributes, variations };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  if (request.method === 'POST') {
    await postSku({
      itemId: params.id,
      price: Number(formData.get('price') as string),
      stock: Number(formData.get('stock') as string) || 0,
      variationId: formData.get('variation') as string,
      attributeId: formData.get('attribute') as string,
    });
  }
  return null;
}

export default function item({ loaderData }: Route.ComponentProps) {
  const { item, attributes, variations } = loaderData;
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader header={item.name} buttonContent="Create SKU">
        {(closeModal) => (
          <SkuForm
            variations={variations}
            attributes={attributes}
            itemId={item.id}
            onSubmitConfirm={closeModal}
          />
        )}
      </PageHeader>
      <h2 className="text-2xl font-bold">Description:</h2>
      <p>{item.description}</p>
      {item.skus.length === 0 && <p>There are no skus, start adding skus.</p>}
      {item.skus.length > 0 && (
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
          data={item.skus}
        />
      )}
    </Layout>
  );
}
