import { useUser } from '@/context';
import { useFilterParams } from '@/hooks';
import { Todo } from '@/interfaces';
import { getTodosByUserId } from '@/services';
import dayjs from 'dayjs';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface TodosQuery {
  todos: Todo[];
  loading: boolean;
  refetch: VoidFunction;
}

const TodosQueryContext = createContext<TodosQuery>({
  todos: [],
  loading: false,
  refetch: () => {},
});

export const useTodosQuery = () => {
  const query = useContext(TodosQueryContext);
  if (!query) {
    throw new Error('useTodosQuery must be used within a TodosQueryProvider');
  }
  return query;
};

export function TodosQueryProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { filterValues } = useFilterParams();

  const queryTodos = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const todos = await getTodosByUserId(user?.uid);

    setTodos(todos);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    queryTodos();
  }, [queryTodos]);

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const { status, priority, createdAt, search } = filterValues;

        const createdAtDate = dayjs(todo.createdAt).get('date');
        const createdAtDateSelected = dayjs(createdAt).get('date');

        const statusMatch = !status || todo.status === status;
        const priorityMatch = !priority || todo.priority === priority;
        const createdAtMatch = !createdAt || createdAtDate === createdAtDateSelected;
        const searchMatch =
          !search ||
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description.toLowerCase().includes(search.toLowerCase());

        return statusMatch && priorityMatch && createdAtMatch && searchMatch;
      }),
    [filterValues, todos]
  );

  return (
    <TodosQueryContext.Provider value={{ todos: filteredTodos, loading, refetch: queryTodos }}>
      {children}
    </TodosQueryContext.Provider>
  );
}
