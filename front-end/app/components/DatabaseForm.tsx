import { TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, Path, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Field } from 'types/Field';

type DatabaseFormProps<T extends z.ZodType<any, any>> = {
  title: string;
  formSchema: T;
  defaultValues: DefaultValues<z.TypeOf<T>> | undefined;
  fields: Field<T>[];
  onSubmit(values: z.infer<T>): Promise<void>;
};
export const DatabaseForm = <T extends z.ZodType<any, any>>({
  title,
  formSchema,
  defaultValues,
  fields,
  onSubmit,
}: DatabaseFormProps<T>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      form.reset(defaultValues);
    } catch (e) {
      console.log('Error submitting form', e);
      return { success: false };
    }
  };

  return (
    <div className="max-w-md mx-auto border p-8 rounded-md">
      <h2 className="text-xl mb-5">{title}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {fields.map((value) => {
            if (value.type === 'select') {
              return (
                <FormField
                  key={value.name}
                  control={form.control}
                  name={value.name}
                  render={({ field: controllerField }) => (
                    <FormItem>
                      <FormLabel>{value.label}</FormLabel>
                      <FormControl>
                        <select {...controllerField} className="w-full">
                          {value.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      {value.description && (
                        <FormDescription>{value.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            return (
              <FormField
                key={value.name}
                control={form.control}
                name={value.name}
                render={({ field: controllerField }) => (
                  <FormItem>
                    <FormLabel>{value.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={value.placeHolder}
                        {...controllerField}
                      />
                    </FormControl>
                    {value.description && (
                      <FormDescription>{value.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
