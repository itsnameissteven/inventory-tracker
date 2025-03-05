interface Item {
  id: string;
  name: string;
  description: string;
  images: Image[];
  skus: Sku[];
  variations: Variation[];
  attributes: Attribute[];
  createdAt: string;
  updatedAt: string;
}
