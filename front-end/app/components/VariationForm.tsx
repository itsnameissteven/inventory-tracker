import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  displayName: z.string().max(255).optional(),
});

const fields: Field<typeof formSchema>[] = [
  {
    name: 'name',
    label: 'Variation Name',
    placeHolder: 'Variation name',
    description: 'The full variation name',
  },
  {
    name: 'displayName',
    label: 'Display name',
    placeHolder: 'Display name',
    description: 'A shorter name for the variation to display in the UI',
  },
];

export const VariationForm = () => {
  const submit = useSubmit();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    submit(values, { method: 'POST', action: '/variations' });
  };

  return (
    <DatabaseForm
      title="Create Variation"
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={{ name: '', displayName: '' }}
    />
  );
};
