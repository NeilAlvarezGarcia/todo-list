import { Priority, Status } from '@/interfaces/todo';

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
    label: 'New',
    value: Status.New,
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
