import type { Route } from './+types/variationEdit';
import { Layout } from '~/components/Layout';
import { getById } from 'server/getById';
import { redirect } from 'react-router';
import { VariationForm } from '~/components/forms/VariationForm';
import { updateEntity } from 'server/updateEntity';
import { auth } from '~/services/auth.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  await auth(request);
  let { data } = await getById<Variation>('variations', params.id);
  return { data };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await updateEntity<Variation>(`variations/${params.id}`, {
    name: formData.get('name') as string,
    displayName: formData.get('displayName') as string,
  });
  return redirect('/variations');
}

export default function variationEdit({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Edit Variation</h1>
      <p>
        ⚠️ Any Changes made will reflect in all item skus using this variation.
      </p>
      <VariationForm
        isEdit
        defaultValues={{ name: data.name, displayName: data.displayName }}
        actionPath={`/variations/${data.id}/edit`}
      />
    </Layout>
  );
}
