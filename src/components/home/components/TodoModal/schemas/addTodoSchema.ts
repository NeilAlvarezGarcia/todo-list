import { object, string } from 'yup';

const errors = {
  title: 'Title is a required field.',
  description: 'Description is a required field.',
  priority: 'Priority is a required field.',
};

export const AddTodoSchema = object({
  title: string().required(errors.title),
  description: string().required(errors.description),
  priority: string().required(errors.priority),
});
