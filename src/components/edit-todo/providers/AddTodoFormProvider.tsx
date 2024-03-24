import { addTodo, getTodo } from '@/services';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';
import { AddTodoSchema } from '../schemas/addTodoSchema';
import { Status, Todo } from '@/interfaces/todo';
import { useUser } from '@/context';
import dayjs from 'dayjs';
import { generateRandomId } from '@/utils/helpers';

const AddTodoFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const { user } = useUser();
  const [error, setError] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);

  const searchParams = useSearchParams();
  const todoId = searchParams.get('id');

  const INITIAL_VALUES = useMemo(
    () => ({
      ...todo,
    }),
    [todo]
  );

  const queryTodo = useCallback(async () => {
    const todo = await getTodo(todoId ?? '');
    setTodo(todo);
  }, [todoId]);

  useEffect(() => {
    queryTodo();
  }, [queryTodo, todoId]);

  const handleSubmit = async (data: Todo) => {
    try {
      const formattedDate = {
        ...data,
        id: generateRandomId(),
        status: Status.New,
        userId: user?.uid || '',
        createdAt: dayjs().valueOf(),
      };

      await addTodo(formattedDate);
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
