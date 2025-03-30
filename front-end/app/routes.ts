import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('item', [route(':id', 'routes/item.tsx')]),
  route('variations', 'routes/variations.tsx'),
  route('attributes', 'routes/attributes.tsx'),
  route('categories', 'routes/categories.tsx'),
] satisfies RouteConfig;
