import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';
import { on } from 'events';

type ItemFormProps = {
  categories: Category[];
  isEdit?: boolean;
  actionPath?: string;
  defaultValues?: {
    name: string;
    description: string;
    categories: string[];
  };
  onSubmitConfirm?: () => void;
};

export const ItemForm = ({
  categories,
  isEdit,
  actionPath = '/',
  defaultValues = { name: '', description: '', categories: [] },
  onSubmitConfirm,
}: ItemFormProps) => {
  const submit = useSubmit();
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255).optional(),
    categories: z.array(z.string()).optional(),
  });

  const fields: Field<typeof formSchema>[] = [
    {
      name: 'name',
      label: 'Name',
      placeHolder: 'Item name',
      description: 'This is the item name',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      placeHolder: 'Item description',
      description: 'This is the item description',
      type: 'text',
    },
    {
      name: 'categories',
      label: 'Categories',
      placeHolder: 'Select categories',
      description: 'Categories for this item',
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      type: 'checkbox',
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(values, {
      method: isEdit ? 'PUT' : 'POST',
      action: actionPath,
    });
    onSubmitConfirm?.();
  };

  return (
    <DatabaseForm
      withStyle={isEdit}
      title="Create Item"
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};
