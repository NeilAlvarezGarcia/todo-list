import { useState } from 'react';
import { Button } from '@/commons/button';
import { List } from '@mui/material';
import styled from 'styled-components';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { TodoItem } from './TodoItem';
import { useTodosQuery } from '../providers/TodosQueryProvider';
import { Text } from '@/commons/text';

export function TodoList() {
  const { loading, todos } = useTodosQuery();

  if (loading) return null;

  return (
    <Container>
      {!!todos.length ? (
        <StyledList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </StyledList>
      ) : (
        <Text textAlign='center'>No todo</Text>
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

const ActionButtons = styled('div')`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 800px) {
    display: none;
  }
`;

const StyledList = styled(List)`
  overflow-y: scroll;
  flex: 1;
`;
