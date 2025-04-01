import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { NavigationMenu } from '@/components/ui/navigation-menu';

import type { Route } from './+types/root';
import './app.css';
import { postItem } from 'server/postItem';
import { Button } from './components/ui/button';
import { logout } from './services/session.server';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  if (formData.get('type') === 'logout') {
    return await logout(request);
  } else {
    try {
      await postItem({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        categoryIds: (formData.get('categories') as string).split(','),
      });
      return { success: true };
    } catch {
      return { success: false };
    }
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', to: '/' },
    { name: 'SKUs', to: '/skus' },
    { name: 'Variations', to: '/variations' },
    { name: 'Attributes', to: '/attributes' },
    { name: 'Categories', to: '/categories' },
  ];
  return (
    <html lang="en" className=" dark min-h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark min-h-screen">
        <div className=" pt-4 pr-4 pl-4 flex justify-between w-full">
          <NavigationMenu>
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-8 pl-4 pr-4'
                    : 'pl-4 pr-4'
                }
                key={item.to}
                to={item.to}
              >
                {item.name}
              </NavLink>
            ))}
          </NavigationMenu>
          <form method="post">
            <input type="hidden" name="type" value="logout" />
            <Button type="submit">Logout</Button>
          </form>
        </div>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
