import { ADMIN_ROL, EMPLYEE_ROL } from '@/helpers/const';
import { User } from '@/interfaces';

const usersDB: User[] = [
  {
    email: 'admin@gmail.com',
    password: 'admin123',
    rol: ADMIN_ROL,
  },
  {
    email: 'employee@gmail.com',
    password: 'employee123',
    rol: EMPLYEE_ROL,
  },
];

export { usersDB };
