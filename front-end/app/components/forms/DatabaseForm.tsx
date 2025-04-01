import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
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
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type DatabaseFormProps<T extends z.ZodType<any, any>> = {
  title: string;
  formSchema: T;
  defaultValues: DefaultValues<z.TypeOf<T>> | undefined;
  fields: Field<T>[];
  onSubmit(values: z.infer<T>): Promise<void>;
  withStyle?: boolean;
};
export const DatabaseForm = <T extends z.ZodType<any, any>>({
  title,
  formSchema,
  defaultValues,
  fields,
  onSubmit,
  withStyle,
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
    <div className={withStyle ? 'max-w-md mx-auto border p-8 rounded-md' : ''}>
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
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{value.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={value.placeHolder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {value.options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>{value.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            } else if (value.type === 'checkbox') {
              return (
                <FormField
                  key={value.name}
                  control={form.control}
                  name={value.name}
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Categories</FormLabel>
                        <FormDescription>
                          Select Categories for your item.
                        </FormDescription>
                      </div>
                      {value.options?.map((option) => {
                        console.log({ option, value });
                        return (
                          <FormField
                            key={option.value}
                            control={form.control}
                            name={value.name}
                            render={({ field }) => {
                              console.log({ field });
                              return (
                                <FormItem
                                  key={option.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        option.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: any) =>
                                                  value !== option.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        );
                      })}
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
                render={({ field: controllerField }) => {
                  return (
                    <FormItem>
                      <FormLabel>{value.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={value.placeHolder}
                          type={value.type}
                          {...controllerField}
                        />
                      </FormControl>
                      {value.description && (
                        <FormDescription>{value.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
