import { FC, PropsWithChildren } from 'react';
import s from '@/styles/section.module.css';

type Props = PropsWithChildren & {
  title: string;
};

export const SectionLayout: FC<Props> = ({ children, title }) => {
  return (
    <div className={s.root}>
      <h2 className={s.title}>{title}</h2>

      <div className={s.content}>{children}</div>
    </div>
  );
};
