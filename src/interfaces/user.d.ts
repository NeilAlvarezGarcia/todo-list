export type UserRol = 'administrator' | 'employee';

export interface User {
  email: string;
  role: UserRol;
  name: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface UserContext {
  user: User | null;
}
