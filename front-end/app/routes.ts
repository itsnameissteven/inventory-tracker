import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('item', [
    route(':id', 'routes/item.tsx'),
    route(':id/edit', 'routes/itemEdit.tsx'),
  ]),
  ...prefix('variations', [
    index('routes/variations.tsx'),
    route(':id/edit', 'routes/variationEdit.tsx'),
  ]),
  ...prefix('skus', [
    index('routes/skus.tsx'),
    route(':id/edit', 'routes/skuEdit.tsx'),
  ]),
  ...prefix('attributes', [
    index('routes/attributes.tsx'),
    route(':id/edit', 'routes/attributeEdit.tsx'),
  ]),
  ...prefix('categories', [
    index('routes/categories.tsx'),
    route(':id/edit', 'routes/categoryEdit.tsx'),
  ]),
] satisfies RouteConfig;
