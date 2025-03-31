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
};

export const BaseForm = ({
  title,
  actionPath,
  defaultValues = { name: '' },
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
    return await submit(values, { method: 'POST', action: actionPath });
  };

  return (
    <DatabaseForm
      title={title}
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};
