import type { Route } from './+types/attributeEdit';
import { Layout } from '~/components/Layout';
import { BaseForm } from '~/components/forms/BaseForm';
import { getById } from 'server/getById';
import { redirect } from 'react-router';
import { updateEntity } from 'server/updateEntity';
import { auth } from '~/services/auth.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  await auth(request);
  let { data } = await getById<Attribute>('attributes', params.id);
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await updateEntity<Attribute>(`attributes/${params.id}`, {
    name: formData.get('name') as string,
  });
  return redirect('/attributes');
}

export default function AttributeEdit({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Attribute</h1>
      <p>
        ⚠️ Any Changes made will reflect in all item skus using this attribute.
      </p>
      <BaseForm
        isEdit
        title={'Edit Attribute'}
        actionPath={`/attributes/${data.id}/edit`}
        defaultValues={{ name: data.name }}
      />
    </Layout>
  );
}
