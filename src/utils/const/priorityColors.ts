import { Priority } from '@/interfaces/todo';
import { theme } from '@/styles';

export const priorityColors = {
  [Priority.Low]: theme.lightBlue,
  [Priority.Medium]: theme.lightYellow,
  [Priority.High]: theme.lightRed,
};
