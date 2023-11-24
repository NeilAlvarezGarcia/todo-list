import { FormData, User } from '@/interfaces';
import { usersDB } from '@/mocks';

export async function getUser(email: string) {
  return usersDB.find((user) => user.email === email.toLowerCase());
}

export async function validateUser(data: FormData) {
  const userFound = await getUser(data.email);

  if (!userFound) return;

  const userValidated = userFound.password === data.password.toLowerCase();

  return {
    isValidated: userValidated,
    user: userFound,
  };
}
