import { addTodo } from '@/services';
import { useRouter } from 'next/navigation';
import { FormProvider } from '@/commons/forms/FormProvider';
import { PropsWithChildren, useState } from 'react';
import { ErrorMessage } from '@/commons/forms';
import { HOME } from '@/utils/const';
import { AddTodoSchema } from '../schemas/addTodoSchema';
import { Priority, Status, Todo } from '@/interfaces';
import { useUser } from '@/context';
import dayjs from 'dayjs';
import { generateRandomId } from '@/utils/helpers';

const INITIAL_VALUES = {
  title: '',
  description: '',
  priority: Priority.Low,
};

const AddTodoFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const { user } = useUser();
  const [error, setError] = useState('');

  const handleSubmit = async (data: Todo) => {
    try {
      const formattedData = {
        ...data,
        id: generateRandomId(),
        status: Status.ReadyToDo,
        userId: user?.uid || '',
        createdAt: dayjs().valueOf(),
      };

      await addTodo(formattedData);
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
