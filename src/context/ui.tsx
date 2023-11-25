import { EMPLYEE_ROL, SIDEBAR } from '@/helpers/const';
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
import { useRouter } from 'next/navigation';

const INITIAL_STATE: UIContext = {
  sidebarOpen: false,
  sidebar: [],
  toggleSideBar: () => {},
};

const uiContext = createContext(INITIAL_STATE);

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();
  const { push } = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebar, setSidebar] = useState<SideBar[] | []>([]);

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

  useEffect(() => {
    if (!sidebar.length) return;

    const href = sidebar[0]?.href;

    push(href);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebar]);

  const value = {
    sidebarOpen,
    toggleSideBar,
    sidebar,
  };

  return <uiContext.Provider value={value}>{children}</uiContext.Provider>;
};

export const useUI = () => useContext(uiContext);
