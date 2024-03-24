import { object, string } from 'yup';
import * as yup from 'yup';

const errors = {
  email: {
    required: 'Email is a required field.',
    validEmail: 'You need to enter a valid email',
  },
  password: {
    required: 'Password is a required field.',
    matches:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  },
  'confirm-password': {
    required: 'You need to confirm the password',
    match: 'Passwords must match',
  },
};

export const SignupSchema = object({
  email: string().required(errors.email.required).email(errors.email.validEmail),
  password: string()
    .required(errors.password.required)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
      errors.password.matches
    ),
  'confirm-password': string()
    .required(errors['confirm-password'].required)
    .oneOf([yup.ref('password')], errors['confirm-password'].match),
});
