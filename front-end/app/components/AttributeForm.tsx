import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const fields: Field<typeof formSchema>[] = [
  {
    name: 'name',
    label: 'Attribute Name',
    placeHolder: 'Attribute name',
  },
];

export const AttributeForm = () => {
  const submit = useSubmit();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return await submit(values, { method: 'POST', action: '/attributes' });
  };

  return (
    <DatabaseForm
      title="Create Attribute"
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={{ name: '' }}
    />
  );
};
