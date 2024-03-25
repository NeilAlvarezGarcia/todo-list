import { Priority, Status } from '@/interfaces';

export const PriorityOptions = [
  {
    label: 'Low',
    value: Priority.Low,
  },
  {
    label: 'Medium',
    value: Priority.Medium,
  },
  {
    label: 'High',
    value: Priority.High,
  },
];

export const StatusOptions = [
  {
    label: 'Ready To Do',
    value: Status.ReadyToDo,
  },
  {
    label: 'In Progress',
    value: Status.InProgress,
  },
  {
    label: 'Done',
    value: Status.Done,
  },
];
