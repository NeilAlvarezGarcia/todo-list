import Head from 'next/head';
import { AddTodo } from '@/components/add-todo';

const AddTodoPage = () => {
  return (
    <>
      <Head>
        <title>Add Todo</title>
      </Head>

      <AddTodo />
    </>
  );
};

export default AddTodoPage;
