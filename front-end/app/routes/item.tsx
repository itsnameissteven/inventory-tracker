import type { Route } from './+types/item';
import { Layout } from '~/components/Layout';
import { postItem } from 'server/postItem';
import { getItemById } from 'server/getItemById';
import { DataTable } from '~/components/DataTable';
import { TableActionButton } from '~/components/TableActionButton';
import { formatDate } from '~/utils/formatDate';
import { SkuForm } from '~/components/SkuForm';
import { getAll } from 'server/getAll';
import { postSku } from 'server/postSku';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data: item } = await getItemById(params.id);
  let { data: attributes } = await getAll<Attribute>('attributes');
  let { data: variations } = await getAll<Variation>('variations');
  return { item, attributes, variations };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  if (request.method === 'POST') {
    await postSku({
      itemId: params.id,
      price: Number(formData.get('price') as string),
      stock: Number(formData.get('stock') as string),
      variationId: formData.get('variation') as string,
      attributeId: formData.get('attribute') as string,
    });
  }
  return null;
}

export default function item({ loaderData }: Route.ComponentProps) {
  const { item, attributes, variations } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">{item.name}</h1>
      <p>{item.description}</p>
      {item.skus.length === 0 && (
        <p>There are no skus, start adding skus below</p>
      )}
      <SkuForm
        variations={variations}
        attributes={attributes}
        itemId={item.id}
      />
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
              render: (data) => <TableActionButton itemId={data.id} />,
            },
          ]}
          data={item.skus}
        />
      )}
    </Layout>
  );
}
