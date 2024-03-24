import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectBase,
  SelectProps,
} from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  options: { label: string; value: string }[];
}

export const SelectInput: FC<Props & SelectProps> = ({ id, label, options = [], ...props }) => {
  return (
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
