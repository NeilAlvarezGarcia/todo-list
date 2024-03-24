import { Todo } from '@/interfaces/todo';
import { getTodos } from '@/services';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

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

  const queryTodos = async () => {
    setLoading(true);
    const todos = await getTodos();

    setTodos(todos);
    setLoading(false);
  };

  useEffect(() => {
    queryTodos();
  }, []);

  return (
    <TodosQueryContext.Provider value={{ todos, loading, refetch: queryTodos }}>
      {children}
    </TodosQueryContext.Provider>
  );
}
