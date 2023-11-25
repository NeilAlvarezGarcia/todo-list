import { FC, PropsWithChildren } from 'react';
import s from '@/styles/dashboard.module.css';
import { SIDEBAR } from '@/helpers/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chevron } from '@/commons/icons';

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  return (
    <main className={s.main}>
      <aside className={s.sidebar}>
        <h1 className={s.title}>Store Line</h1>

        <ul className={s.list}>
          {SIDEBAR.map(({ name, href, icon }, i) => {
            const isActive = href === pathname;

            return (
              <li key={i}>
                <Link href={href} className={`${s.link} ${isActive && s.linkActive}`}>
                  <span className={s.linkSpan}>
                    {icon}

                    {name}
                  </span>

                  {isActive && <Chevron />}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className={s.leftSide}>
        <header className={s.header}>
          <div className={s.profile}>
            <p>user@gmail.com</p>
          </div>
        </header>

        <div className={s.page}>{children}</div>
      </div>
    </main>
  );
};
