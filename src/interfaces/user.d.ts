type UserRol = 'administrator' | 'employee';

interface User {
  email: string;
  role: UserRol;
  name: string;
  uid: string;
  id: string;
}

type Users = User[];

interface FormData {
  email: string;
  password: string;
  name?: string;
  role?: UserRol;
}

interface UserContext {
  user: User | null;
}

export { UserContext, UserRol, User, Users, FormData };
