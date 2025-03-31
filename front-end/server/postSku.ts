import api from './axios';

export const postSku = async (
  sku: PickRequired<Sku, 'price' | 'stock' | 'variationId'> & {
    attributeId?: string;
  }
) => {
  console.log({ sku });
  const response = await api.post<Sku>('/item-skus/add', sku);
  return response;
};
