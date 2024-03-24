import { TodoList } from './components/TodoList';
import { Toolbar } from './components/Toolbar';
import { HomeLayout } from '@/commons/layouts';
import { TodosQueryProvider } from './providers/TodosQueryProvider';

export function Home() {
  return (
    <TodosQueryProvider>
      <HomeLayout>
        <Toolbar />
        <TodoList />
      </HomeLayout>
    </TodosQueryProvider>
  );
}
