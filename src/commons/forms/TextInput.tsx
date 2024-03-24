import { FilledInput, FormControl, InputLabel, FilledInputProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '../text';

export interface InputPropsBase extends FilledInputProps {
  id: string;
  label?: string;
}

export function TextInput({ id, label, ...props }: InputPropsBase) {
  const { control } = useFormContext() || {};

  return control ? (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant='filled'>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <FilledInput id={id} error={!!error} {...props} {...field} />
          <Text error>{error?.message}</Text>
        </FormControl>
      )}
    />
  ) : (
    <FormControl variant='filled'>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput id={id} {...props} />
    </FormControl>
  );
}
