import { auth } from '@/config/firebase';
import { User, UserContext } from '@/interfaces';
import { getUser } from '@/services';
import { LOGIN } from '@/utils/const';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

const INITIAL_STATE: UserContext = {
  user: null,
};

const userContext = createContext<UserContext>(INITIAL_STATE);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.uid) return push(LOGIN);

      const userData = await getUser(user?.uid);

      setUser(userData as User);
    });

    return () => unSubscribe();
  }, [push]);

  const value: UserContext = {
    user,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
