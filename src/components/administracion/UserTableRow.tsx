import { User } from '@/interfaces';
import { FC } from 'react';
import s from '@/styles/table.module.css';
import { TrashCan } from '@/commons/icons';

type Props = {
  user: User;
};

export const UserTableRow: FC<Props> = ({ user }) => {
  return (
    <>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button className={s.deleteAction}>
          <TrashCan />
        </button>
      </td>
    </>
  );
};
