import { User } from 'firebase/auth';

interface FormData {
  email: string;
  password: string;
}

interface UserContext {
  user: User | null;
}

export { UserContext, FormData };
