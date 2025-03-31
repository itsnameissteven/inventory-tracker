import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('item', [route(':id', 'routes/item.tsx')]),
  ...prefix('variations', [
    index('routes/variations.tsx'),
    route(':id/edit', 'routes/variationEdit.tsx'),
  ]),
  ...prefix('skus', [index('routes/skus.tsx')]),
  ...prefix('attributes', [
    index('routes/attributes.tsx'),
    route(':id/edit', 'routes/attributeEdit.tsx'),
  ]),
  ...prefix('categories', [
    index('routes/categories.tsx'), // Route for /categories
    route(':id/edit', 'routes/categoryEdit.tsx'), // Route for /categories/:id/edit
  ]),
] satisfies RouteConfig;
