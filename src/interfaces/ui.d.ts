import { ReactNode } from 'react';

export interface UIContext {
  sidebarOpen: boolean;
  sidebar: SideBar[] | [];
  toggleSideBar: VoidFunction;
}

export interface SideBar {
  name: string;
  href: string;
  icon: ReactNode;
  private: boolean;
}
