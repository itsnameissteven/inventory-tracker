import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

export const ItemForm = () => {
  const submit = useSubmit();
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255).optional(),
  });

  const fields: Field<typeof formSchema>[] = [
    {
      name: 'name',
      label: 'Name',
      placeHolder: 'Item name',
      description: 'This is the item name',
    },
    {
      name: 'description',
      label: 'Description',
      placeHolder: 'Item description',
      description: 'This is the item description',
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(values, { method: 'POST', action: '/' });
  };

  return (
    <DatabaseForm
      title="Create Item"
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={{ name: '', description: '' }}
    />
  );
};
