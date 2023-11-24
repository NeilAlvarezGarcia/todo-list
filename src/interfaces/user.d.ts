export type UserRol = 'administrator' | 'employee';

export interface User {
  email: string;
  password: string;
  rol: UserRol;
}

export interface FormData {
  email: string;
  password: string;
}

export interface UserContext {
  user: User | null;
  isLogin: boolean;
  login: (user: User | null) => void;
}
