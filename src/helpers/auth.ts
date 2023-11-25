import { FormData } from '@/interfaces';
import { emailRegex, errorMessages, passwordRegex } from './const';

export function validateUserData(data: FormData) {
  const emailValidated = emailRegex.test(data.email);
  const passwordValidated = passwordRegex.test(data.password);

  if (!data.email || !data.password) return errorMessages.empty;

  if (!emailValidated) return errorMessages.email;
  if (!passwordValidated) return errorMessages.password;

  return false;
}
