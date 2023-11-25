import { auth } from '@/config/firebase';
import { User, UserContext } from '@/interfaces';
import { getUser } from '@/services';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

const INITIAL_STATE: UserContext = {
  user: null,
};

const userContext = createContext<UserContext>(INITIAL_STATE);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      const userData = await getUser(user?.uid);

      setUser(userData as User);
    });

    return () => unSubscribe();
  }, []);

  const value: UserContext = {
    user,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
