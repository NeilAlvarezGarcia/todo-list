enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum Status {
  ReadyToDo = 'Ready_To_Do',
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

export { Priority, Status, Todo };
