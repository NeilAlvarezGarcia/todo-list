import { Loader } from '@/components';
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
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.uid) {
        push(LOGIN);
        stopLoader();
        return;
      }

      const userData = await getUser(user?.uid);

      setUser(userData as User);
      stopLoader();
    });

    return () => unSubscribe();
  }, [push]);

  const stopLoader = () => setLoadingApp(false);

  const value: UserContext = {
    user,
  };

  return (
    <userContext.Provider value={value}>{loadingApp ? <Loader /> : children}</userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
