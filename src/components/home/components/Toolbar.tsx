import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/commons/button';
import { DatePicker, InputSearch, SelectInput } from '@/commons/forms';
import Link from 'next/link';
import { ADD_TODO } from '@/utils/const';
import { PriorityOptions, StatusOptions } from '@/utils/const/dropdownOptions';
import { useFilterParams } from '@/hooks';

export function Toolbar() {
  const { filterValues, handleClearFilters, handleFilterChange, hasFilters } = useFilterParams();

  return (
    <StyledToolbar>
      <LeftContainer>
        <DatePicker
          id='created-date'
          name='created-date'
          label='Date'
          onChange={handleFilterChange}
          value={filterValues.createdAt}
        />

        <SelectInput
          options={StatusOptions}
          name='status'
          id='status'
          label='Status'
          onChange={handleFilterChange}
          value={filterValues.status}
        />
        <SelectInput
          options={PriorityOptions}
          name='priority'
          id='priority'
          label='Priority'
          onChange={handleFilterChange}
          value={filterValues.priority}
        />

        <InputSearch
          name='search'
          id='search'
          label='Search'
          onChange={handleFilterChange}
          value={filterValues.search}
        />

        {hasFilters && (
          <Button color='error' variant='text' size='small' onClick={handleClearFilters}>
            Clear filters
          </Button>
        )}
      </LeftContainer>

      <Button endIcon={<AddIcon />} component={Link} href={ADD_TODO} sx={{ maxHeight: 36 }}>
        Add todo
      </Button>
    </StyledToolbar>
  );
}

const StyledToolbar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const LeftContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;
