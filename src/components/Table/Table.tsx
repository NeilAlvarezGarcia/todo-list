import { Chevron } from '@/commons/icons';
import s from '@/styles/table.module.css';
import { FC } from 'react';

type Props = {
  headers: {
    id: string;
    name: string;
  }[];
  data: (string | number)[][];
};

export const Table: FC<Props> = ({ headers = [], data = [] }) => {
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
          {data.map((item) => (
            <tr key={1}>
              {item.map((value) => (
                <td key={2}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={s.pagination}>
        <div className={s.dataPerPage}>
          <p>filas por página</p>

          <select name='' id='' value={10}>
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
    </div>
  );
};
