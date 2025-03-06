import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useFetcher, useSubmit } from 'react-router';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
});

const fields = [
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
] as const;

export const ItemForm = () => {
  const submit = useSubmit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    submit(values, { method: 'POST', action: '/' });
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((value) => (
          <FormField
            key={value.name}
            control={form.control}
            name={value.name}
            render={({ field: controllerField }) => (
              <FormItem>
                <FormLabel>{value.label}</FormLabel>
                <FormControl>
                  <Input placeholder={value.placeHolder} {...controllerField} />
                </FormControl>
                <FormDescription>{value.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
