import { List } from '@mui/material';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';
import { useTodosQuery } from '../providers/TodosQueryProvider';
import { Text } from '@/commons/text';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/commons/button';
import Link from 'next/link';
import { ADD_TODO } from '@/utils/const';
import { useFilterParams } from '@/hooks';

export function TodoList() {
  const { loading, todos } = useTodosQuery();
  const { hasFilters } = useFilterParams();

  if (loading)
    return (
      <CenterContainer>
        <Text type='h2'>Loading...</Text>
      </CenterContainer>
    );

  return (
    <Container>
      {!!todos.length ? (
        <StyledList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </StyledList>
      ) : (
        <CenterContainer>
          <Text type='h3'>{hasFilters ? 'No to-do was found.' : 'No to-do added yet.'}</Text>
          <Button endIcon={<AddIcon />} component={Link} href={ADD_TODO}>
            Add a new todo
          </Button>
        </CenterContainer>
      )}
    </Container>
  );
}

const Container = styled('div')`
  margin: auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
`;

const CenterContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 auto;
  gap: 16px;
  max-width: 300px;
`;

const StyledList = styled(List)`
  overflow-y: scroll;
  flex: 1;
`;
