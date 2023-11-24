import { User, UserContext } from '@/interfaces';
import React, { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

const INITIAL_STATE: UserContext = {
  user: null,
  isLogin: false,
  login: () => null,
};

const userContext = createContext<UserContext>(INITIAL_STATE);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const login = (user: User | null) => {
    setUser(user);
    setIsLogin(true);
  };

  const value: UserContext = {
    user,
    isLogin,
    login,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
