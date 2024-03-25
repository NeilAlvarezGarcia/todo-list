import { TextInput, SubmitButton, SelectInput } from '@/commons/forms';
import { HomeLayout } from '@/commons/layouts';
import { Text } from '@/commons/text';
import styled from 'styled-components';
import { Button } from '@/commons/button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
import { HOME } from '@/utils/const';
import { PriorityOptions, StatusOptions } from '@/utils/const/dropdownOptions';
import AddTodoFormProvider from './providers/EditTodoFormProvider';

export function EditTodo() {
  return (
    <HomeLayout>
      <Button
        variant='text'
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        href={HOME}
        sx={{ width: 'fit-content' }}>
        Back
      </Button>

      <AddTodoFormProvider>
        <Container>
          <Text type='h2'>Edit To-do</Text>

          <TextInput id='title' label='Title' />
          <TextInput id='description' label='description' />
          <SelectInput options={PriorityOptions} id='priority' label='Priority' />
          <SelectInput options={StatusOptions} id='status' label='Status' />

          <SubmitButton text='Edit' loadingText='Editing...' />
        </Container>
      </AddTodoFormProvider>
    </HomeLayout>
  );
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px auto 0;
  max-width: 600px;
`;
