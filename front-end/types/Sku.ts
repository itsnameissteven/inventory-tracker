type Sku = {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemId: string;
  variationId: string | null;
  attributeId: string | null;
  variation: Variation | null;
  attribute: Attribute | null;
  price: number;
  stock: number;
};
