import React, { FC } from 'react';
import s from '@/styles/Home.module.css';
import { populateIndicatorData } from '@/utils/helpers';
import { Purchases } from '@/interfaces';

type Props = {
  purchases: Purchases;
};

export const Indicators: FC<Props> = ({ purchases }) => {
  const indicatorsData = populateIndicatorData(purchases);

  return (
    <ul className={s.salesIndicators}>
      {indicatorsData?.map(({ title, value, color, icon }) => (
        <li key={title} className={s.listItem} style={{ borderLeft: `thick solid ${color}` }}>
          <div className={s.data}>
            <h3 className={s.title} style={{ color }}>
              {title}
            </h3>

            <p className={s.value}>{value}</p>
          </div>

          {icon}
        </li>
      ))}
    </ul>
  );
};
