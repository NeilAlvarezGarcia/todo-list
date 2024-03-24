import { FieldValues, FormProvider as RHFFormProvider, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProviderProps } from './formProvider.d';

const DEFAULT_RESOLVER: unknown = Symbol.for('Yup');

export function FormProvider<TFieldValues extends FieldValues, TContext = unknown>({
  children,
  mode = 'onSubmit',
  reValidateMode = 'onSubmit',
  criteriaMode = 'firstError',
  shouldFocusError = false,
  resolver = DEFAULT_RESOLVER as Resolver<TFieldValues, TContext>,
  schema,
  defaultValues,
  submit,
  ...props
}: FormProviderProps<TFieldValues, TContext>) {
  const methods = useForm<TFieldValues, TContext>({
    ...props,
    mode,
    defaultValues,
    reValidateMode,
    criteriaMode,
    shouldFocusError,
    resolver: resolver === DEFAULT_RESOLVER ? (schema ? yupResolver(schema) : undefined) : resolver,
  });

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </RHFFormProvider>
  );
}
