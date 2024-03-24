enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum Status {
  New = 'New',
  InProgress = 'In_Progress',
  Done = 'Done',
}

interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: number;
  userId: string;
}

export { Priority, Status };
export type { Todo };
