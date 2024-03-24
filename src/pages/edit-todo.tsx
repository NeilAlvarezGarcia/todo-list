import { AddTodo } from '@/components/edit-todo';
import Head from 'next/head';

const AddTodoPage = () => {
  return (
    <>
      <Head>
        <title>Edit Todo</title>
      </Head>

      <AddTodo />
    </>
  );
};

export default AddTodoPage;
