import { addTodo } from '@/services';
import { useRouter } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { PropsWithChildren, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';
import { AddTodoSchema } from '../schemas/addTodoSchema';
import { Priority, Todo } from '@/interfaces/todo';

const INITIAL_VALUES = {
  title: '',
  description: '',
  priority: Priority.Low,
};

const AddTodoFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: Todo) => {
    try {
      await addTodo(data);
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
