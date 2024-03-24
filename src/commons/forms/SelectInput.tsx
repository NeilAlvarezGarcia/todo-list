import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectBase,
  SelectProps,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '../text';

interface Props {
  options: { label: string; value: string }[];
  id: string;
}

export const SelectInput: FC<Props & SelectProps> = ({ id, label, options = [], ...props }) => {
  const { control } = useFormContext() || {};

  return control ? (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant='filled'>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <SelectBase id={id} error={!!error} {...props} {...field}>
            {options?.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </SelectBase>
          <Text error>{error?.message}</Text>
        </FormControl>
      )}
    />
  ) : (
    <FormControl variant='filled'>
      <InputLabel id={id}>{label}</InputLabel>
      <SelectBase id={id} {...props}>
        {options?.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
};
