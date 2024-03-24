import {
  FieldValues,
  FormProviderProps as RHFFormProviderProps,
  FormState,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import * as Yup from 'yup';

export type FormMethods<TFieldValues extends FieldValues = FieldValues, TContext = unknown> = Omit<
  UseFormReturn<TFieldValues, TContext>,
  'formState'
> & {
  getFormState(): FormState<FieldValues>;
};

export type FormSubmitNext<TFieldValues extends FieldValues, TContext = unknown> = (
  data: TFieldValues,
  methods: FormMethods<TFieldValues, TContext>,
  event?: React.BaseSyntheticEvent
) => unknown | Promise<unknown>;

export interface FormProviderProps<TFieldValues extends FieldValues, TContext = unknown>
  extends Partial<Omit<RHFFormProviderProps<TFieldValues, TContext>, 'handleSubmit'>>,
    UseFormProps<TFieldValues, TContext> {
  schema?: Yup.AnyObjectSchema;
  submit: SubmitHandler<TFieldValues>;
}
