import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

type BaseFormProps = {
  title: string;
  actionPath: string;
  defaultValues?: {
    name: string;
  };
  isEdit?: boolean;
  onSubmitConfirm?: () => void;
};

export const BaseForm = ({
  isEdit,
  title,
  actionPath,
  defaultValues = { name: '' },
  onSubmitConfirm,
}: BaseFormProps) => {
  const submit = useSubmit();

  const fields: Field<typeof formSchema>[] = [
    {
      name: 'name',
      label: `Name`,
      placeHolder: `Name`,
      type: 'text',
    },
  ];
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(values, { method: 'POST', action: actionPath });
    onSubmitConfirm?.();
  };

  return (
    <DatabaseForm
      withStyle={isEdit}
      title={title}
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};
