export type UserRol = 'administrator' | 'employee';

export interface User {
  email: string;
  role: UserRol;
  name: string;
  uid: string;
}

export interface FormData {
  email: string;
  password: string;
  name?: string;
  role?: UserRol;
}

export interface UserContext {
  user: User | null;
}
