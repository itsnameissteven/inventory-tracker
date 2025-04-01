import { TypeOf, ZodType } from 'zod';
import { Path } from 'react-hook-form';

export type Field<T extends ZodType<any, any, any>> = {
  name: Path<TypeOf<T>>;
  label: string;
  placeHolder?: string;
  description?: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'password';
  options?: { label: string; value: string }[];
};
