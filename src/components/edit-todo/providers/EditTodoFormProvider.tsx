import { getTodo, updateTodo } from '@/services';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { PropsWithChildren, useMemo, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';
import { AddTodoSchema } from '../schemas/addTodoSchema';
import { Todo } from '@/interfaces';

const AddTodoFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const todoId = searchParams.get('id');
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const priority = searchParams.get('priority');
  const status = searchParams.get('status');

  const INITIAL_VALUES = useMemo(
    () =>
      ({
        title,
        description,
        priority,
        status,
      } as Todo),
    [description, priority, status, title]
  );

  const handleSubmit = async (data: Todo) => {
    try {
      const todo = await getTodo(todoId ?? '');
      await updateTodo({
        ...todo,
        ...data,
      });
      setError('');
      push(HOME);
    } catch (err: any) {
      const error = err.code?.split('/')[1]?.replace(/-/g, ' ').toUpperCase() || err.message;
      setError(error);
    }
  };

  return (
    <FormProvider schema={AddTodoSchema} submit={handleSubmit} defaultValues={INITIAL_VALUES}>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </FormProvider>
  );
};

export default AddTodoFormProvider;
