import { Status } from '@/interfaces';
import { theme } from '@/styles';

export const statusColors = {
  [Status.ReadyToDo]: theme.gray,
  [Status.InProgress]: theme.lightYellow,
  [Status.Done]: theme.lightGreen,
};
