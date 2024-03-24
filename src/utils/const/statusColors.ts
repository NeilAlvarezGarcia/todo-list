import { Status } from '@/interfaces/todo';
import { theme } from '@/styles';

export const statusColors = {
  [Status.New]: theme.gray,
  [Status.InProgress]: theme.lightYellow,
  [Status.Done]: theme.lightBlue,
};
