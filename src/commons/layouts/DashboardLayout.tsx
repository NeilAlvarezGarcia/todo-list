import { FC, PropsWithChildren } from 'react';
import s from '@/styles/dashboard.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chevron, Menu } from '@/commons/icons';
import { useUI } from '@/context';
import { Profile } from '@/components';

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const { sidebarOpen, toggleSideBar, sidebar } = useUI();

  return (
    <main className={s.main}>
      <aside className={`${s.sidebar} ${sidebarOpen && s.open}`}>
        <div className={s.sidebarHeader}>
          {sidebarOpen && <h1>Store Line</h1>}

          <button onClick={toggleSideBar}>
            <Menu />
          </button>
        </div>

        <ul className={s.list}>
          {sidebar.map(({ name, href, icon }, i) => {
            const isActive = href === pathname;

            return (
              <li key={i}>
                <Link
                  href={href}
                  className={`${s.link} ${isActive && s.linkActive} ${sidebarOpen && s.open}`}>
                  <span className={s.linkSpan}>
                    {icon}

                    {sidebarOpen && name}
                  </span>

                  {isActive && sidebarOpen && (
                    <span className={`${s.chevron} ${isActive && s.active}`}>
                      <Chevron />
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className={s.leftSide}>
        <header className={s.header}>
          <Profile />
        </header>

        <div className={s.page}>{children}</div>
      </div>
    </main>
  );
};
