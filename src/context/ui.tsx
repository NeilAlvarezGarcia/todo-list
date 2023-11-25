import React, { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

const INITIAL_STATE = {
  sidebarOpen: false,
  toggleSideBar: () => {},
};

const uiContext = createContext(INITIAL_STATE);

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSideBar = () => setSidebarOpen((prevState) => !prevState);

  const value = {
    sidebarOpen,
    toggleSideBar,
  };

  return <uiContext.Provider value={value}>{children}</uiContext.Provider>;
};

export const useUI = () => useContext(uiContext);
