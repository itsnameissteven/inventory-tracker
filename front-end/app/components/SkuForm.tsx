import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

export const SkuForm = ({
  variations,
  attributes,
  itemId,
}: {
  variations: Variation[];
  attributes: Attribute[];
  itemId: string;
}) => {
  const submit = useSubmit();
  const formSchema = z.object({
    price: z.string(),
    stock: z.string(),
    variation: z.string(),
    attribute: z.string().optional(),
  });

  const fields: Field<typeof formSchema>[] = [
    {
      name: 'price',
      label: 'Item Price',
      placeHolder: '0.00',
      description: 'This is the item price',
      type: 'number',
    },
    {
      name: 'stock',
      label: 'Item Stock',
      placeHolder: '0',
      description: 'Quantity of stock available',
      type: 'number',
    },
    {
      name: 'variation',
      label: 'Variation',
      placeHolder: 'Select Variation',
      description: 'Associated variation',
      options: variations.map((variation) => ({
        label: variation.name,
        value: variation.id,
      })),
      type: 'select',
    },
    {
      name: 'attribute',
      label: 'Attribute',
      placeHolder: 'Select Attribute',
      description: 'Associated attribute',
      options: attributes.map((attribute) => ({
        label: attribute.name,
        value: attribute.id,
      })),
      type: 'select',
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(values, {
      method: 'POST',
      action: `/item/${itemId}`,
    });
  };

  return (
    <DatabaseForm
      title="Create Item SKU"
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={{
        price: '',
        stock: '',
        variation: '',
        attribute: '',
      }}
    />
  );
};
