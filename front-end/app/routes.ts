import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('item', [route(':id', 'routes/item.tsx')]),
] satisfies RouteConfig;
