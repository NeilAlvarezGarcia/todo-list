import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/commons/button';
import { DatePicker, InputSearch, SelectInput } from '@/commons/forms';
import { PriorityOptions, StatusOptions } from '../constants/dropdownOptions';
import Link from 'next/link';
import { ADD_TODO } from '@/utils/const';

export function Toolbar() {
  return (
    <StyledToolbar>
      <LeftContainer>
        {/* <DatePicker id='created-date' label='Date' />

        <SelectInput options={StatusOptions} id='status' label='Status' />
        <SelectInput options={PriorityOptions} id='priority' label='Priority' />

        <InputSearch id='search' label='Search' />

        <Button color='error' variant='text' size='small'>
          Clear filters
        </Button> */}
      </LeftContainer>

      <Button endIcon={<AddIcon />} component={Link} href={ADD_TODO}>
        Add todo
      </Button>
    </StyledToolbar>
  );
}

const StyledToolbar = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const LeftContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;
