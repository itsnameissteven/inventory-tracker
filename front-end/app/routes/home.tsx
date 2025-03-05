import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { getItems } from 'server/getItems';
import { Layout } from '~/components/Layout';
import { DataTable } from '~/components/DataTable';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let { data } = await getItems();
  return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Layout>
      <DataTable title="Items" headers={[]} data={loaderData.data} />
    </Layout>
  );
}
