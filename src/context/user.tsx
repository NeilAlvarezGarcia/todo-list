import { auth } from '@/config/firebase';
import { UserContext } from '@/interfaces';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

const INITIAL_STATE: UserContext = {
  user: null,
};

const userContext = createContext<UserContext>(INITIAL_STATE);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      stopLoader();
    });

    return () => unSubscribe();
  }, []);

  const stopLoader = () => setLoadingApp(false);

  const value: UserContext = {
    user,
  };

  return <userContext.Provider value={value}>{!loadingApp && children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
