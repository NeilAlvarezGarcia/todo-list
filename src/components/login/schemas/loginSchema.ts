import { object, string } from 'yup';

const errors = {
  email: {
    required: 'Email is a required field.',
    validEmail: 'You need to enter a valid email',
  },
  password: 'Password is a required field.',
};

export const LoginSchema = object({
  email: string().required(errors.email.required).email(errors.email.validEmail),
  password: string().required(errors.password),
});
