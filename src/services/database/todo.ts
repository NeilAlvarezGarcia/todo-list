import { deleteDocument, getDocument, getDocuments, setDocument } from '@/utils/helpers';
import { TODOS } from '@/utils/const';
import { Todo } from '@/interfaces/todo';

async function addTodo(data: Todo) {
  await setDocument(TODOS, data.id, data);
}

async function getTodo(uid: string): Promise<Todo> {
  return (await getDocument(TODOS, uid)) as Todo;
}

async function getTodos(): Promise<Todo[]> {
  return await getDocuments(TODOS);
}

async function deleteTodo(id: string) {
  await deleteDocument(TODOS, id);
}

export { addTodo, getTodo, getTodos, deleteTodo };
