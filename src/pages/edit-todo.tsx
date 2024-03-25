import { EditTodo } from '@/components/edit-todo';
import Head from 'next/head';

const AddTodoPage = () => {
  return (
    <>
      <Head>
        <title>Edit Todo</title>
      </Head>

      <EditTodo />
    </>
  );
};

export default AddTodoPage;
