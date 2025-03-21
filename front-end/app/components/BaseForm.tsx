import { z } from 'zod';
import { useSubmit } from 'react-router';
import { DatabaseForm } from './DatabaseForm';
import { Field } from 'types/Field';

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const BaseForm = ({
  title,
  actionPath,
}: {
  title: string;
  actionPath: string;
}) => {
  const submit = useSubmit();

  const fields: Field<typeof formSchema>[] = [
    {
      name: 'name',
      label: `${title} Name`,
      placeHolder: `Enter ${title} Name`,
    },
  ];
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return await submit(values, { method: 'POST', action: actionPath });
  };

  return (
    <DatabaseForm
      title={`Create ${title}`}
      fields={fields}
      formSchema={formSchema}
      onSubmit={onSubmit}
      defaultValues={{ name: '' }}
    />
  );
};
