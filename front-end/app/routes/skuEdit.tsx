import type { Route } from './+types/skuEdit';
import { Layout } from '~/components/Layout';
import { getById } from 'server/getById';
import { redirect } from 'react-router';
import { SkuForm } from '~/components/forms/SkuForm';
import { getAll } from 'server/getAll';
import { updateEntity } from 'server/updateEntity';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { data: sku } = await getById<Sku>('item-skus', params.id);
  const { data: variations } = await getAll<Variation>('variations');
  const { data: attributes } = await getAll<Attribute>('attributes');
  return { sku, variations, attributes };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await updateEntity<Sku>(`item-skus/${params.id}`, {
    price: Number(formData.get('price') as string),
    stock: Number(formData.get('stock') as string) || 0,
    variationId: formData.get('variation') as string,
    attributeId: formData.get('attribute') as string,
  });
  return redirect('/skus');
}

export default function skuEdit({ loaderData }: Route.ComponentProps) {
  const { sku, variations, attributes } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Item SKU</h1>
      <SkuForm
        isEdit
        variations={variations}
        attributes={attributes}
        itemId={sku.itemId}
        defaultValues={{
          attribute: sku.attribute?.id || '',
          variation: sku.variation?.id || '',
          price: sku.price.toString(),
          stock: sku.stock.toString(),
        }}
        actionPath={`/skus/${sku.id}/edit`}
      />
    </Layout>
  );
}
