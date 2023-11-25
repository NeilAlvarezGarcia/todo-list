import { EMPLYEE_ROL, SIDEBAR } from '@/util/const';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUser } from './user';
import { SideBar, UIContext } from '@/interfaces';

const INITIAL_STATE: UIContext = {
  sidebarOpen: false,
  sidebar: [],
  toggleSideBar: () => {},
};

const uiContext = createContext(INITIAL_STATE);

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  const [sidebar, setSidebar] = useState<SideBar[] | []>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSideBar = () => setSidebarOpen((prevState) => !prevState);

  useEffect(() => {
    if (!user) {
      setSidebar([]);
      setSidebarOpen(true);
      return;
    }

    const userSidebar = SIDEBAR.filter((item) =>
      user?.role === EMPLYEE_ROL ? !item.private : item
    );

    setSidebar(userSidebar);
  }, [user]);

  const value = {
    sidebarOpen,
    toggleSideBar,
    sidebar,
  };

  return <uiContext.Provider value={value}>{children}</uiContext.Provider>;
};

export const useUI = () => useContext(uiContext);
