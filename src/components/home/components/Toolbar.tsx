import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/commons/button';
import Link from 'next/link';
import { ADD_TODO } from '@/utils/const';
import { Filters } from './Filters';

export function Toolbar() {
  return (
    <StyledToolbar>
      <Filters />

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
