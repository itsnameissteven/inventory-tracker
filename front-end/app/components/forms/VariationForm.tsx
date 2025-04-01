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
    type: 'text',
  },
  {
    name: 'displayName',
    label: 'Display name',
    placeHolder: 'Display name',
    description: 'A shorter name for the variation to display in the UI',
    type: 'text',
  },
];

interface VariationFormProps {
  isEdit?: boolean;
  actionPath?: string;
  defaultValues?: {
    name: string;
    displayName: string;
  };
  onSubmitConfirm?: () => void;
}

export const VariationForm = ({
  isEdit = false,
  actionPath = '/variations',
  defaultValues = { name: '', displayName: '' },
  onSubmitConfirm,
}: VariationFormProps) => {
  const submit = useSubmit();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    submit(values, { method: isEdit ? 'PUT' : 'POST', action: actionPath });
    onSubmitConfirm?.();
  };

  return (
    <DatabaseForm
      withStyle={isEdit}
      title={`${isEdit ? 'Update' : 'Create'} Variation`}
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};
