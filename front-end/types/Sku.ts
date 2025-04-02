type Sku = {
  id: string;
  createdAt: string;
  updatedAt: string;
  item: Item;
  variation: Variation | null;
  attribute: Attribute | null;
  price: number;
  stock: number;
};
