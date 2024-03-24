import { VisibilityOff, Visibility } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { InputPropsBase, TextInput } from './TextInput';
import SearchIcon from '@mui/icons-material/Search';

export function InputSearch(props: InputPropsBase) {
  return (
    <TextInput
      endAdornment={
        <InputAdornment position='end'>
          <SearchIcon />
        </InputAdornment>
      }
      {...props}
    />
  );
}
