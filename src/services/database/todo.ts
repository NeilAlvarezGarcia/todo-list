import { getDocument, getDocuments, setDocument } from '@/utils/helpers';
import { TODO } from '@/utils/const';
import { Todo } from '@/interfaces/todo';

async function addTodo(data: Todo) {
  await setDocument(TODO, '', data);
}

async function getTodo(uid: string): Promise<Todo> {
  return (await getDocument(TODO, uid)) as Todo;
}

async function getTodos(): Promise<Todo[]> {
  return await getDocuments(TODO);
}

export { addTodo, getTodo, getTodos };
