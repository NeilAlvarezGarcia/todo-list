import { Chevron } from '@/commons/icons';
import s from '@/styles/table.module.css';
import { FC, ReactNode } from 'react';

type tableDataRecord = Record<string, string | number>;

type Props = {
  headers: {
    id: string;
    name: string;
  }[];
  data: tableDataRecord[];
  row: (item: tableDataRecord, i: number) => ReactNode;
  hasPagination?: boolean;
  emptyText?: string;
};

export const Table: FC<Props> = ({
  headers = [],
  data = [],
  row = () => null,
  hasPagination = true,
  emptyText = 'No hay ningún resultado',
}) => {
  return (
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr>
            {headers?.map(({ id, name }) => (
              <th key={id}>{name}</th>
            ))}
          </tr>
        </thead>

        <tbody className={s.tableBody}>
          {data.map((item, i) => (
            <tr key={item.id}>{row(item, i)}</tr>
          ))}

          {!Boolean(data.length) && (
            <tr className={s.empty}>
              <td>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>

      {hasPagination && (
        <div className={s.pagination}>
          <div className={s.dataPerPage}>
            <p>filas por página</p>

            <select name='' id='' value={10} onChange={() => {}}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
            </select>
          </div>

          <div className={s.currentPage}>
            <p>1-2 de 2</p>

            <div className={s.arrowActions}>
              <div className={s.chevronInverse}>
                <Chevron color='#000' />
              </div>

              <div className={s.chevron}>
                <Chevron color='#000' />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
