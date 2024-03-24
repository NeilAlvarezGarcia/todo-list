enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum Status {
  New = 'New',
  InProgress = 'InProgress',
  Done = 'Done',
}

interface Todo {
  id: string | number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}

export { Priority, Status };
export type { Todo };
